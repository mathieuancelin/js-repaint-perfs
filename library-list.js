(function() {

  var list = [
    { type: 'todo', id: 'aurelia', label: 'DBMON Aurelia', url: '#' },
    { type: 'naive', id: 'cycle', label: 'DBMON Cycle.js', url: './cycle'},
    { type: 'naive', id: 'ember', url: './ember', label: 'DBMON Ember' },
    { type: 'naive', id: 'angular', url: './angular', label: 'DBMON Angular' },
    { type: 'naive', id: 'angular-light', url: './angular-light', label: 'DBMON Angular Light' },
    { type: 'naive', id: 'angular2', url: './angular2', label: 'DBMON Angular 2.0 Alpha' },
    { type: 'naive', id: 'react', url: './react', label: 'DBMON React' },
    { type: 'naive', id: 'magjs', url: './magjs', label: 'DBMON MagJS' },
    { type: 'naive', id: 'elem', url: './elem', label: 'DBMON elem' },
    { type: 'naive', id: 'elem-vdom', url: './elem-vdom', label: 'DBMON elem-vdom' },
    { type: 'naive', id: 'elem', url: './elm', label: 'DBMON elm' },
    { type: 'naive', id: 'ractive', url: './ractive', label: 'DBMON Ractive' },
    { type: 'naive', id: 'mithril', url: './mithril', label: 'DBMON Mithril' },
    { type: 'naive', id: 'citot7', url: './cito+t7-precompiled', label: 'DBMON Cito+t7' },
    { type: 'naive', id: 'inferno', url: './inferno', label: 'DBMON Inferno' },
    { type: 'naive', id: 'riot', url: './riot', label: 'DBMON Riot.js' },
    { type: 'naive', id: 'polymer', url: './polymer', label: 'DBMON Polymer 1.0' },
    { type: 'naive', id: 'vanilla', url: './vanilla-simple', label: 'DBMON vanilla' },
    { type: 'naive', id: 'dott', url: './dotT', label: 'DBMON dotT' },
    { type: 'naive', id: 'canvas', url: './canvas', label: 'DBMON canvas' },
    { type: 'naive', id: 'react-canvas', url: './react-canvas', label: 'DBMON react-canvas' },
    { type: 'naive', id: 'sammy', url: './sammy', label: 'DBMON sammy' },
    { type: 'naive', id: 'vue', url: './vue', label: 'DBMON Vue.js' },
    { type: 'naive', id: 'backbone', url: './backbone', label: 'DBMON Backbone' },
    { type: 'naive', id: 'knockout', url: './knockout', label: 'DBMON Knockout' },
    { type: 'naive', id: 'regularjs', url: './regularjs', label: 'DBMON Regularjs' },
    { type: 'naive', id: 'maskjs', url: './mask/index.html', label: 'DBMON MaskJS' },
    { type: 'naive', id: 'matreshkajs', url: './matreshka/index.html', label: 'DBMON Matreshka.js' },
    { type: 'naive', id: 'rotorjs', url: './rotorjs/index.html', label: 'DBMON RotorJS' },
    { type: 'optimized', id: "cycle + snabbdom", label: "DBMON Cycle.js + Snabbdom", url: "./cycle-snabbdom"},
    { type: 'optimized', id: 'motorcycle', label: 'DBMON Motorcycle.js', url: './motorcycle'},
    { type: 'optimized', id: 'react', url: './react/opt.html', label: 'DBMON React' },
    { type: 'optimized', id: 'angular', url: './angular/opt.html', label: 'DBMON Angular' },
    { type: 'optimized', id: 'angular-light', url: './angular-light/opt.html', label: 'DBMON Angular Light' },
    { type: 'optimized', id: 'angular2', url: './angular2/opt.html', label: 'DBMON Angular 2.0 Alpha' },
    { type: 'optimized', id: 'angular-track-by', url: './angular-track-by', label: 'DBMON Angular (track by $index)' },
    { type: 'optimized', id: 'elem', url: './elm/opt.html', label: 'DBMON elm' },
    { type: 'optimized', id: 'vanilla', url: './vanilla-optimized', label: 'DBMON vanilla' },
    { type: 'optimized', id: 'maskjs', url: './mask/index_opt.html', label: 'DBMON MaskJS' },
    { type: 'optimized', id: 'vue', url: './vue/opt.html', label: 'DBMON Vue.js' },
    { type: 'optimized', id: 'rotorjs', url: './rotorjs/with_thunks.html', label: 'DBMON RotorJS (with using VnodeImmutableThunk)' },
  ];

  function Library() {
    var url = this.props.lib.url;
    return Elem.el('div', { className: 'child ' + this.props.lib.type, onClick: function() { window.open(url, '_blank'); } }, [
      Elem.el('a', { href: url, target: '_blank' }, this.props.lib.label)
    ]);
  }

  function LibraryList() {
    return Elem.el('div', { className: 'container', style: { marginTop: '20px' } }, this.props.array.sort(function(a, b) { return a.id.localeCompare(b.id); }).map(function(item) {
      return Elem.el(Library, { lib: item })
    }));
  }

  Elem.render(LibraryList, '#list', { array: list, name: '' });
})();
