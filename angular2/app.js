function AppComponent() {
    var me = this;
    this.databases = [];
    var load = function() {
        me.databases = ENV.generateData().toArray();
        Monitoring.renderRate.ping();
        setTimeout(load, ENV.timeout);
    };
    load();
}

AppComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: 'my-app'
    }),
    new angular.ViewAnnotation({
        directives: [angular.NgFor],
        templateUrl: 'app-component.html'
    })
];

document.addEventListener('DOMContentLoaded', function() {
    angular.bootstrap(AppComponent);
});