
/**
 * @class
 */
function DBMon() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var div0 = document.createElement('div');
  var table1 = document.createElement('table');
  var tbody2 = document.createElement('tbody');
  var children0 = new Monkberry.Map();

  // Construct dom
  table1.appendChild(tbody2);
  table1.setAttribute("class", "table table-striped latest-data");
  div0.appendChild(table1);

  // Update functions
  this.__update__ = {
    databases: function (databases) {
      Monkberry.loop(_this, tbody2, children0, DBMon_for0, databases);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [div0];
}
DBMon.prototype = Object.create(Monkberry.prototype);
DBMon.prototype.constructor = DBMon;
DBMon.pool = [];
DBMon.prototype.update = function (__data__) {
  if (__data__.databases !== undefined) {
    this.__update__.databases(__data__.databases);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function DBMon_for0() {
  Monkberry.call(this);
  this.__cache__ = {};
  this.__state__ = {};
  var _this = this;

  // Create elements
  var custom0 = document.createComment('Database');
  var child0 = {};

  // Update functions
  this.__update__ = {
    dbname_lastSample: function (dbname, lastSample) {
      Monkberry.insert(_this, custom0, child0, Database, {'dbname': dbname, 'lastSample': lastSample});
    }
  };

  // Set root nodes
  this.nodes = [custom0];
}
DBMon_for0.prototype = Object.create(Monkberry.prototype);
DBMon_for0.prototype.constructor = DBMon_for0;
DBMon_for0.pool = [];
DBMon_for0.prototype.update = function (__data__) {
  if (__data__.dbname !== undefined) {
    this.__cache__.dbname = __data__.dbname;
  }
  if (__data__.lastSample !== undefined) {
    this.__cache__.lastSample = __data__.lastSample;
  }
  if (this.__cache__.dbname !== undefined && this.__cache__.lastSample !== undefined) {
    this.__update__.dbname_lastSample(this.__cache__.dbname, this.__cache__.lastSample);
  }
};

window.DBMon = DBMon;

/**
 * @class
 */
function Database() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var tr0 = document.createElement('tr');
  var td1 = document.createElement('td');
  var text2 = document.createTextNode('');
  var td3 = document.createElement('td');
  var span4 = document.createElement('span');
  var text5 = document.createTextNode('');
  var for0 = document.createComment('for');
  var children0 = new Monkberry.Map();

  // Construct dom
  td1.appendChild(text2);
  td1.setAttribute("class", "dbname");
  span4.appendChild(text5);
  td3.appendChild(span4);
  td3.setAttribute("class", "query-count");
  tr0.appendChild(td1);
  tr0.appendChild(td3);
  tr0.appendChild(for0);

  // Update functions
  this.__update__ = {
    dbname: function (dbname) {
      text2.textContent = dbname;
      tr0.setAttribute("key", dbname);;
    },
    lastSample: function (lastSample) {
      text5.textContent = lastSample.nbQueries;
      span4.setAttribute("class", lastSample.countClassName);;
      Monkberry.loop(_this, for0, children0, Database_for0, lastSample.topFiveQueries);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [tr0];
}
Database.prototype = Object.create(Monkberry.prototype);
Database.prototype.constructor = Database;
Database.pool = [];
Database.prototype.update = function (__data__) {
  if (__data__.dbname !== undefined) {
    this.__update__.dbname(__data__.dbname);
  }
  if (__data__.lastSample !== undefined) {
    this.__update__.lastSample(__data__.lastSample);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function Database_for0() {
  Monkberry.call(this);
  this.__cache__ = {};
  this.__state__ = {};
  var _this = this;

  // Create elements
  var custom0 = document.createComment('Query');
  var child0 = {};

  // Update functions
  this.__update__ = {
    elapsedClassName_formatElapsed_query: function (elapsedClassName, formatElapsed, query) {
      Monkberry.insert(_this, custom0, child0, Query, {'elapsedClassName': elapsedClassName, 'formatElapsed': formatElapsed, 'query': query});
    }
  };

  // Set root nodes
  this.nodes = [custom0];
}
Database_for0.prototype = Object.create(Monkberry.prototype);
Database_for0.prototype.constructor = Database_for0;
Database_for0.pool = [];
Database_for0.prototype.update = function (__data__) {
  if (__data__.elapsedClassName !== undefined) {
    this.__cache__.elapsedClassName = __data__.elapsedClassName;
  }
  if (__data__.formatElapsed !== undefined) {
    this.__cache__.formatElapsed = __data__.formatElapsed;
  }
  if (__data__.query !== undefined) {
    this.__cache__.query = __data__.query;
  }
  if (this.__cache__.elapsedClassName !== undefined && this.__cache__.formatElapsed !== undefined && this.__cache__.query !== undefined) {
    this.__update__.elapsedClassName_formatElapsed_query(this.__cache__.elapsedClassName, this.__cache__.formatElapsed, this.__cache__.query);
  }
};

window.Database = Database;

/**
 * @class
 */
function Query() {
  Monkberry.call(this);

  // Create elements
  var td0 = document.createElement('td');
  var text1 = document.createTextNode('');
  var div2 = document.createElement('div');
  var div3 = document.createElement('div');
  var text4 = document.createTextNode('');
  var div5 = document.createElement('div');

  // Construct dom
  div3.appendChild(text4);
  div3.setAttribute("class", "popover-content");
  div5.setAttribute("class", "arrow");
  div2.appendChild(div3);
  div2.appendChild(div5);
  div2.setAttribute("class", "popover left");
  td0.appendChild(text1);
  td0.appendChild(div2);

  // Update functions
  this.__update__ = {
    formatElapsed: function (formatElapsed) {
      text1.textContent = formatElapsed;
    },
    query: function (query) {
      text4.textContent = query;
    },
    elapsedClassName: function (elapsedClassName) {
      td0.setAttribute("class", ("Query ") + (elapsedClassName));;
    }
  };

  // Set root nodes
  this.nodes = [td0];
}
Query.prototype = Object.create(Monkberry.prototype);
Query.prototype.constructor = Query;
Query.pool = [];
Query.prototype.update = function (__data__) {
  if (__data__.formatElapsed !== undefined) {
    this.__update__.formatElapsed(__data__.formatElapsed);
  }
  if (__data__.query !== undefined) {
    this.__update__.query(__data__.query);
  }
  if (__data__.elapsedClassName !== undefined) {
    this.__update__.elapsedClassName(__data__.elapsedClassName);
  }
};

window.Query = Query;
