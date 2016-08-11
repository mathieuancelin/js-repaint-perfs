var view = Monkberry.render(DBMon, document.getElementById('dbmon'));

function frame() {
	Monitoring.renderRate.ping();
	view.update({databases: ENV.generateData().toArray()});
	setTimeout(frame, ENV.timeout);
}

setTimeout(frame, 1);
