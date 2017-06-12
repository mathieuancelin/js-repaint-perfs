(function () {

  function Library() {
    var url = this.props.lib.url;
    return Elem.el('div', { className: 'child ' + this.props.lib.type, onClick: function() { window.open(url, '_blank'); } }, [
      Elem.el('a', { href: url, target: '_blank' }, this.props.lib.label)
    ]);
  }

  function LibraryList() {
    return Elem.el('div', { className: 'container', style: { marginTop: '20px' } }, this.props.array.sort(function(a, b) { return a.id.localeCompare(b.id); }).map(function(item) {
      return Elem.el(Library, { lib: item })
    }));
  }

  Elem.render(LibraryList, '#list', { array: List, name: '' });
})();
