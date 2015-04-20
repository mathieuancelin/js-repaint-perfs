/** @jsx React.DOM */

var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;

var Item = React.createClass({

  statics: {
    getItemHeight: function () {
      return 30;
    }
  },

  getLeft: function() { 
    this.left = this.left + this.props.cellWidth;
    return this.left;
  },

  render: function () {
    var cells = [];    
    this.left = (-this.props.cellWidth) + 20;
    var cellStyle = this.getTitleStyle();
    //cellStyle.backgroundColor = '#FF0000';
    cells.push(<Text key="99999" style={cellStyle}>{this.props.row.dbname}</Text>);
    cells.push(<Text key="99998" style={this.getTitleStyle()}>{this.props.row.samples[0].queries.length + ''}</Text>);
    this.props.row.samples[0].topFiveQueries.forEach(function(e, i) { 
      cells.push(<Text key={i} style={this.getTitleStyle()}>{e.formatElapsed}</Text>)
    }.bind(this));
    return (
      <Group style={this.getStyle()}>
        {cells}
      </Group>
    );
  },

  getStyle: function () {
    return {
      width: this.props.width,
      height: Item.getItemHeight(),
      backgroundColor: (this.props.itemIndex % 2) ? '#eee' : '#a5d2ee'
    };
  },

  getTitleStyle: function () {
  	var left = this.getLeft();
    return {
      top: 5,
      left: left,
      width: this.props.cellWidth,
      height: 18,
      fontSize: 14,
      lineHeight: 18
    };
  }

});

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;

var App = React.createClass({

  getInitialState: function() {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({
      databases: ENV.generateData().toArray()
    });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples, ENV.timeout);
  },

  componentDidMount: function() {
    this.loadSamples();
  },

  render: function () {
    var size = this.getSize();
    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <ListView
          style={this.getListViewStyle()}
          numberOfItemsGetter={this.getNumberOfItems}
          itemHeightGetter={Item.getItemHeight}
          itemGetter={this.renderItem} />
      </Surface>
    );
  },

  renderItem: function (itemIndex, scrollTop) {
  	var size = this.getSize();
    var cellWidth = parseInt(size.width / 7);
    var row = this.state.databases[itemIndex];
    return (
        <Item width={this.getSize().width}
              height={Item.getItemHeight()} 
              row={row} 
              key={itemIndex} 
              cellWidth={cellWidth} 
              itemIndex={itemIndex} />
      );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle: function () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  getNumberOfItems: function () {
    return this.state.databases.length;
  }

});

React.render(<App />, document.getElementById('main'));
