var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UI = stem.UI;

UI.Element.prototype.addListenersFromOptions = stem.NOOP_FUNCTION;
UI.Element.prototype.applyNodeAttributes = function () {
    if (this.options.className) {
        this.node.className = this.options.className;
    } else if (this.node.className) {
        this.node.removeAttribute("class");
    }
};

var BenchmarkElement = function (_UI$Element) {
    _inherits(BenchmarkElement, _UI$Element);

    function BenchmarkElement() {
        _classCallCheck(this, BenchmarkElement);

        return _possibleConstructorReturn(this, (BenchmarkElement.__proto__ || Object.getPrototypeOf(BenchmarkElement)).apply(this, arguments));
    }

    _createClass(BenchmarkElement, [{
        key: "renderDatabase",
        value: function renderDatabase(database) {
            var databaseTopFiveQueries = [];

            for (var queryIndex = 0; queryIndex < database.lastSample.topFiveQueries.length; ++queryIndex) {
                var query = database.lastSample.topFiveQueries[queryIndex];
                databaseTopFiveQueries.push(UI.createElement(
                    "td",
                    { className: query.elapsedClassName },
                    query.formatElapsed,
                    new UI.Element({ className: "popover left", children: [query.query] }),
                    new UI.Element({ className: "arrow" })
                ));
            }

            return [UI.createElement(
                "tr",
                null,
                UI.createElement(
                    "td",
                    { className: "dbname" },
                    database.dbname
                ),
                UI.createElement(
                    "td",
                    null,
                    UI.createElement(
                        "span",
                        { className: database.lastSample.countClassName },
                        database.lastSample.nbQueries
                    )
                ),
                databaseTopFiveQueries
            )];
        }
    }, {
        key: "renderDatabases",
        value: function renderDatabases(databases) {
            var renderedDatabases = [];
            for (var index = 0; index < databases.length; ++index) {
                renderedDatabases.push(this.renderDatabase(databases[index]));
            }

            return renderedDatabases;
        }
    }, {
        key: "render",
        value: function render() {
            var databases = ENV.generateData().toArray();

            return [UI.createElement(
                "table",
                { className: "table table-striped latest-data" },
                UI.createElement(
                    "tbody",
                    null,
                    this.renderDatabases(databases)
                )
            )];
        }
    }, {
        key: "redraw",
        value: function redraw() {
            var _this2 = this;

            _get(BenchmarkElement.prototype.__proto__ || Object.getPrototypeOf(BenchmarkElement.prototype), "redraw", this).call(this);
            Monitoring.renderRate.ping();
            setTimeout(function () {
                return _this2.redraw();
            }, ENV.timeout);
        }
    }]);

    return BenchmarkElement;
}(UI.Element);

var node = document.getElementById("dbmon");
var benchmarkElement = new BenchmarkElement();
benchmarkElement.bindToNode(node, true);
