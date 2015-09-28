
alight.controllers.DBMonCtrl = function(scope) {
    scope.databases = [];

    var load = function() {
        scope.databases = ENV.generateData().toArray();
        scope.$scan();
        Monitoring.renderRate.ping();

        setTimeout(load, ENV.timeout);
    };
    load();
};
