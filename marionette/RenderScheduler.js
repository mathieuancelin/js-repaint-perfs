
/**
* Render Scheduler to render views in an animation Frame.
* ensures each render method is called only once per view.
*/
var RenderScheduler = {
  active:  true,
  //maxTasksPerFrame: 10000,
  waiting: {},
  pending: [],
  frameId: null,

  /**
   * Schedule a view to be rendered, if it was scheduled before
   * the previous entry will be deleted.
   */
  add: function(view, method, args) {
    var key = view.cid + "::" + method,
        idx = this.waiting[key];
    // Skip if the view is already waiting to be rendered
    if( idx >= 0) { 
        this.pending[key] = {
          id:     key,
          view:   view,
          method: view[method],
          args:   args
        };
    } else {
        // Add to the queue
        this.waiting[key] = this.pending.length;
        this.pending.push({
          id:     key,
          view:   view,
          method: view[method],
          args:   args
        });
    }

    // Request an animation frame
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.process);
    }
  },

  createTask: function(view, method) {
    return function() {
      RenderScheduler.active ?
      RenderScheduler.add(view, method, arguments):
      view[method].apply(view, arguments);
    }
  },

  /**
   * Render all pending views
   */
  process: function() {
    var data, count = 0, scrollbarTop = $(document).scrollTop(), winHeight = scrollbarTop + $(window).height();
    while (this.pending.length /*&& count < this.maxTasksPerFrame*/) {
      data = this.pending.shift();
      if (!data.view.offset) {
        data.view.offset = data.view.$el.offset();
      }
      if( !data.view.alwaysVisible && data.view.offset.top >=  scrollbarTop && data.view.offset.top < winHeight) {
        data.method.apply( data.view, data.args);
      }
      //delete this.waiting[data.id];
      this.waiting[data.id] = -1;
      ++count;
    }
    /*if( this.pending.length) {
        this.frameId = window.requestAnimationFrame(this.process);
    } else {*/
        this.frameId = null;
    //}
    //console.log("RenderScheduler::processed: " + count)
  }
};
// Bind the process function to the scheduler
RenderScheduler.process = _.bind(RenderScheduler.process, RenderScheduler);