const { h, Component, render } = preact;
/** @jsx h */


class Query extends Component {
	shouldComponentUpdate({ query, elapsed }) {
		return query!==this.props.query || elapsed!==this.props.elapsed;
	}

	render({ query, elapsed, formatElapsed, elapsedClassName }) {
		return (
			<td class={'Query '+elapsedClassName}>
				{ formatElapsed || ' ' }
				<div class="popover left">
					<div class="popover-content">{ query }</div>
					<div class="arrow" />
				</div>
			</td>
		);
	}
}


class Database extends Component {
	shouldComponentUpdate({ lastMutationId }) {
		return lastMutationId!==this.props.lastMutationId;
	}

	renderQuery(query) {
		return (
			<Query
				query={query.query}
				elapsed={query.elapsed}
				formatElapsed={query.formatElapsed}
				elapsedClassName={query.elapsedClassName}
			/>
		);
	}

	render({ lastSample, dbname }) {
		return (
			<tr>
				<td class="dbname">
					{dbname}
				</td>
				<td class="query-count">
					<span class={lastSample.countClassName}>
						{lastSample.nbQueries}
					</span>
				</td>
				{ lastSample.topFiveQueries.map(this.renderQuery) }
			</tr>
		);
	}
}


class DBMon extends Component {
	state = {
		databases: []
	};

	loadSamples() {
		this.setState({
			databases: ENV.generateData(true).toArray()
		});
		Monitoring.renderRate.ping();
		setTimeout(::this.loadSamples, ENV.timeout);
	}

	componentDidMount() {
		this.loadSamples();
	}

	renderDatabase(database) {
		return (
			<Database
				lastMutationId={database.lastMutationId}
				dbname={database.dbname}
				samples={database.samples}
				lastSample={database.lastSample}
			/>
		);
	}

	render({ }, { databases }) {
		return (
			<div>
				<table class="table table-striped latest-data">
					<tbody>
						{ databases.map(this.renderDatabase) }
					</tbody>
				</table>
			</div>
		);
	}
}


render(<DBMon />, document.getElementById('dbmon'));
