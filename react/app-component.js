/** @jsx React.DOM */

var Query = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.elapsedClassName !== this.props.elapsedClassName) return true;
    if (nextProps.formatElapsed !== this.props.formatElapsed) return true;
    if (nextProps.query !== this.props.query) return true;
    return false;
  },
  render: function() {
    return (
      <td className={ "Query " + this.props.elapsedClassName}>
        {this.props.formatElapsed}
        <div className="popover left">
          <div className="popover-content">{this.props.query}</div>
          <div className="arrow"/>
        </div>
      </td>
    );
  }
});

var Database = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.lastMutationId === this.props.lastMutationId) return false;
    return true;
  },
  render: function() {
    var lastSample = this.props.lastSample;
    return (
      <tr key={this.props.dbname}>
        <td className="dbname">
          {this.props.dbname}
        </td>
        <td className="query-count">
          <span className={this.props.lastSample.countClassName}>
            {this.props.lastSample.nbQueries}
          </span>
        </td>
        {this.props.lastSample.topFiveQueries.map(function(query, index) {
            return <Query key={index}
              query={query.query}
              elapsed={query.elapsed}
              formatElapsed={query.formatElapsed}
              elapsedClassName={query.elapsedClassName} />
          })}
      </tr>
    );
  }
});

var DBMon = React.createClass({
  getInitialState: function() {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({
      databases: ENV.generateData(true).toArray()
    });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples, ENV.timeout);
  },

  componentDidMount: function() {
    this.loadSamples();
  },

  render: function() {

    var databases = this.state.databases.map(function(database) {
      return <Database
                key={database.dbname}
                lastMutationId={database.lastMutationId}
                dbname={database.dbname}
                samples={database.samples}
                lastSample={database.lastSample} />
    });

    return (
      <div>
        <table className="table table-striped latest-data">
          <tbody>
            {databases}
          </tbody>
        </table>
      </div>
    );
  }
});

ReactDOM.render(<DBMon />, document.getElementById('dbmon'));
