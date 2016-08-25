var App = Sugar.Component.extend({
	init: function(config) {
		config = this.cover(config, {
			'target': '#app',
			'model' : {
				'databases': []
			}
		});
		this.Super('init', arguments);
	}
});

var app = Sugar.core.create('app', App);


function loadSamples() {
	app.vm.set('databases', ENV.generateData().toArray());
	Monitoring.renderRate.ping();
	setTimeout(loadSamples, ENV.timeout);
}

loadSamples();