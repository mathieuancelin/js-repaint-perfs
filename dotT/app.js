
var template = doT.template(document.getElementById("template").text);

var render = function () {

    var databases = ENV.generateData().toArray();

    document.getElementById("app").innerHTML = template({'databases':databases});


    Monitoring.renderRate.ping();
    setTimeout(render, ENV.timeout);
};

render();
