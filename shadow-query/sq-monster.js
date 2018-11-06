const sqTemplate = `
<style>
	:host {
		display: block;
		width: 100%;
		font-family: sans-serif;
	}
</style>
<sq-slider entropy="0.5"></sq-slider>
<sq-table></sq-table>
<sq-stats></sq-stats>
`;

customElements.define('sq-monster', class extends HTMLElement {
	constructor() {super(); $.template(this, sqTemplate);}
	connectedCallback() {
		this.attachShadow({mode: 'open'}).appendChild(this.template);
		setTimeout(() => {
			this._table = $(this, 'sq-table')[0];
			this._table.initialize(ENV.generateData().toArray());
			this._update();
		});
	}
	_update() {
		this._table.update(ENV.generateData().toArray());
		Monitoring.renderRate.ping();
		setTimeout(() => this._update());
	}
});

const tableTemplate = `
<style>
	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		table-layout: fixed;
		font-size: 75%;
	}
	tr {
	}
	tr:nth-child(odd) > td {background: #f9f9f9;}
	td {
		border-top: 1px solid #ddd;
		line-height: 1.42857143;
		padding: 8px;
		vertical-align: top;
		position: relative;
	}
	td > div {
		display: none;
	}
	td:hover > div {
		display: block;
		left: -100%;
		width: 100%;
		margin-left: -10px;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid rgba(0,0,0,.2);
		border-radius: 6px;
		box-shadow: 0 5px 10px rgba(0,0,0,.2);
		max-width: 276px;
		padding: 1px;
		position: absolute;
		text-align: left;
		top: 0;
		white-space: normal;
		z-index: 1010;
		padding: 9px 14px;
	}
	div:after {
		content: "";
		top: calc(50% - 5px);
		right: -7px;
		width: 10px;
		height: 10px;
		position: absolute;
		background: white;
		transform: rotate(45deg);
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-bottom: 0 none transparent;
		border-left: 0 none transparent;
	}
	span {
		background: #5cb85c;
		border-radius: .25em;
		color: #fff;
		font-weight: 700;
		line-height: 1;
		padding: .2em .6em .3em;
		text-align: center;
		vertical-align: baseline;
	}
	span.w {background: #f0ad4e;}
</style>
<table></table>
`;
const  rowTemplate = `<tr>\
<td> </td>\
<td><span> </span></td>\
<td> <div> </div></td>\
<td> <div> </div></td>\
<td> <div> </div></td>\
<td> <div> </div></td>\
<td> <div> </div></td>\
</tr>`;

customElements.define('sq-table', class extends HTMLElement {
	constructor() {
		super();
		$.template(this, {'default':tableTemplate, 'row': rowTemplate});
	}
	connectedCallback() {
		this.attachShadow({mode: 'open'}).appendChild(this.template);
	}
	initialize(data) {
		this._iniDom(data);
		this._iniAccessors();
	}
	_iniDom(data) {
		$(this, 'table').childArray({
			array: data,
			template: () => this.getTemplate('row'),
			update: (row, data) => row.query('td:first-child').text(data.dbname),
		});
	}
	_iniAccessors() {
		const row = $(this, 'tr');
		const data = 'td + td + td';
		this._classed   = row.map(tr => $(tr, 'span')[0].childNodes[0]);
		this._class     = row.map(tr => $(tr, 'span')[0].classList);
		this._dataCell  = row.map(tr => $(tr, data).map(td => td.childNodes[0]));
		this._dataPopup = row.map(tr => $(tr, 'div').map(div=>div.childNodes[0]));
	}
	update(data) {
		for(let i = 0; i < data.length; i++) {
			this._classed[i].nodeValue = data[i].lastSample.nbQueries;
			this._class  [i].toggle(
				'w', data[i].lastSample.countClassName.indexOf('w')!==-1
			);
			const queries = data[i].lastSample.topFiveQueries;
			for(let j = 0; j < queries.length; j++) {
				this._dataCell [i][j].nodeValue = queries[j].formatElapsed;
				this._dataPopup[i][j].nodeValue = queries[j].query;
			}
		}
	}
});
