var data = {
    databases: []
};

rivets.bind($('#dbmon'), data);

var load = function () {
    data.databases = ENV.generateData().toArray();
    Monitoring.renderRate.ping();
    setTimeout(load, ENV.timeout);
};
load();
