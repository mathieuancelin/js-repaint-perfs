const { h, render } = preact;
/** @jsx h */

// a simple render loop.
let root = document.getElementById('dbmon'),
	base;
function frame() {
	Monitoring.renderRate.ping();
	base = render(<DBMon databases={ENV.generateData().toArray()} />, root, base);
	setTimeout(frame, ENV.timeout);
}
setTimeout(frame, 1);


const DBMon = ({ databases }) => (
	<div>
		<table class="table table-striped latest-data">
			<tbody>
				{ databases.map(Database) }
			</tbody>
		</table>
	</div>
);

const Database = ({ dbname, lastSample }) => (
	<tr key={dbname}>
		<td class="dbname">
			{ dbname }
		</td>
		<td class="query-count">
			<span class={lastSample.countClassName}>
				{ lastSample.nbQueries }
			</span>
		</td>
		{ lastSample.topFiveQueries.map(Query) }
	</tr>
);

const Query = ({ elapsedClassName, formatElapsed, query }) => (
	<td class={ "Query " + elapsedClassName}>
		{ formatElapsed }
		<div class="popover left">
			<div class="popover-content">{ query }</div>
			<div class="arrow" />
		</div>
	</td>
);
