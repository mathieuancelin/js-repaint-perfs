var data = [];
var viewModel = {
    databases: ko.observableArray(data)
};
ko.applyBindings(viewModel);

var load = function () {
    viewModel.databases(ENV.generateData().toArray());
    Monitoring.renderRate.ping();
    setTimeout(load, ENV.timeout);
};
load();
