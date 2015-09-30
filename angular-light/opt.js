
alight.controllers.DBMonCtrl = function(scope) {
    scope.databases = [];

    var load = function() {
        scope.databases = ENV.generateData(true).toArray();
        scope.$scan();
        Monitoring.renderRate.ping();

        setTimeout(load, ENV.timeout);
    };
    load();
};
