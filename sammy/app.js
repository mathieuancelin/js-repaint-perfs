(function ($) {
    var app = Sammy('#app', function () {
        this.use('Template');
        this.get('#/', function (context) {
            var each = function () {

                var databases = ENV.generateData().toArray();
                context.render('templates/line.template', {data: databases})
                    .replace(context.$element());
                Monitoring.renderRate.ping();
                setTimeout(each, ENV.timeout);
            };
            each();
        });
    });
    $(function () {
        app.run('#/');

    });
})(jQuery);

