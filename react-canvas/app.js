/** @jsx React.DOM */

var Group = ReactCanvas.Group;
var Layer = ReactCanvas.Layer;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;
var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;

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
    cells.push(<Text key="99999" style={this.getFirstStyle()}>{this.props.row.dbname}</Text>);
    cells.push(
      <Group key="99998" style={this.getTitleStyle()}>
        <Text style={this.getCountStyle(this.props.row.lastSample.nbQueries)}>{this.props.row.lastSample.nbQueries + ''}</Text>  
      </Group>
    );
    this.props.row.lastSample.topFiveQueries.forEach(function(e, i) { 
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
      backgroundColor: '#FFFFFF',
      borderWidth: 1, 
      borderColor: '#000000'
    };
  },

  getCountStyle: function(count) {
    var color = '#5cb85c';
    if (count >= 20) {
      color = "#d9534f";
    }
    else if (count >= 10) {
      color = "#f0ad4e";
    }
    return {
      top: 5,
      left: this.props.cellWidth,
      width: 25,
      height: 18,
      fontSize: 14,
      lineHeight: 18,
      textAlign: 'center',
      backgroundColor: color
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
      textAlign: 'center',
      lineHeight: 18
    };
  },

  getFirstStyle: function () {
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
        <Item width={size.width}
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
