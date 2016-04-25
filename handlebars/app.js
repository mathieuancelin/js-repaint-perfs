var data = {
    databases: []
};

var source = document.getElementById("tableTemplate").innerHTML;
var template = Handlebars.compile(source);

var load = function () {
    data.databases = ENV.generateData().toArray();
    document.getElementById("main").innerHTML = template(data);
    Monitoring.renderRate.ping();
    setTimeout(load, ENV.timeout);
};
load();

