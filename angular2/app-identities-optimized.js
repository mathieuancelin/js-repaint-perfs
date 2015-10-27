var AppComponent = ng.
  Component({
    selector: 'my-app'
  }).
  View({
    directives: [ng.NgFor],
    templateUrl: 'app-component.html'
  }).
  Class({
    constructor: function AppComponent() {
      var me = this;
      this.databases = [];
      var load = function() {
          me.databases = ENV.generateData(true).toArray();
          Monitoring.renderRate.ping();
          setTimeout(load, ENV.timeout);
      };
      load();
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});
