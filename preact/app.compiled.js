!function() {
    "use strict";
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
    }
    var _preact = preact, h = _preact.h, Component = _preact.Component, render = _preact.render, Query = function(_Component) {
        function Query() {
            _Component.apply(this, arguments);
        }
        return _inherits(Query, _Component), Query.prototype.shouldComponentUpdate = function(_ref) {
            var query = _ref.query, elapsed = _ref.elapsed;
            return query !== this.props.query || elapsed !== this.props.elapsed;
        }, Query.prototype.render = function(_ref2) {
            var query = _ref2.query, formatElapsed = (_ref2.elapsed, _ref2.formatElapsed), elapsedClassName = _ref2.elapsedClassName;
            return h("td", {
                "class": "Query " + elapsedClassName
            }, formatElapsed || " ", h("div", {
                "class": "popover left"
            }, h("div", {
                "class": "popover-content"
            }, query), h("div", {
                "class": "arrow"
            })));
        }, Query;
    }(Component), Database = function(_Component2) {
        function Database() {
            _Component2.apply(this, arguments);
        }
        return _inherits(Database, _Component2), Database.prototype.shouldComponentUpdate = function(_ref3) {
            var lastMutationId = _ref3.lastMutationId;
            return lastMutationId !== this.props.lastMutationId;
        }, Database.prototype.renderQuery = function(query) {
            return h(Query, {
                query: query.query,
                elapsed: query.elapsed,
                formatElapsed: query.formatElapsed,
                elapsedClassName: query.elapsedClassName
            });
        }, Database.prototype.render = function(_ref4) {
            var lastSample = _ref4.lastSample, dbname = _ref4.dbname;
            return h("tr", null, h("td", {
                "class": "dbname"
            }, dbname), h("td", {
                "class": "query-count"
            }, h("span", {
                "class": lastSample.countClassName
            }, lastSample.nbQueries)), lastSample.topFiveQueries.map(this.renderQuery));
        }, Database;
    }(Component), DBMon = function(_Component3) {
        function DBMon() {
            _Component3.apply(this, arguments), this.state = {
                databases: []
            };
        }
        return _inherits(DBMon, _Component3), DBMon.prototype.loadSamples = function() {
            this.setState({
                databases: ENV.generateData(!0).toArray()
            }), Monitoring.renderRate.ping(), setTimeout(this.loadSamples.bind(this), ENV.timeout);
        }, DBMon.prototype.componentDidMount = function() {
            this.loadSamples();
        }, DBMon.prototype.renderDatabase = function(database) {
            return h(Database, {
                lastMutationId: database.lastMutationId,
                dbname: database.dbname,
                samples: database.samples,
                lastSample: database.lastSample
            });
        }, DBMon.prototype.render = function(_ref5, _ref6) {
            var databases = _ref6.databases;
            return h("div", null, h("table", {
                "class": "table table-striped latest-data"
            }, h("tbody", null, databases.map(this.renderDatabase))));
        }, DBMon;
    }(Component);
    render(h(DBMon, null), document.getElementById("dbmon"));
}();
