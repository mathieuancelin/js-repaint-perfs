(async function () {

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	var tableSort;
	var renderFrame = document.getElementById('render-frame');
	var collectTime = 2000; // ms
	var sleepTime = 200; // ms
	var listData = [];

	var renderInfo = document.getElementById("render-info");

	for (var i = 0; i < List.length; i++) {
		var rateByMutation = [];
		for (var k = 0; k < 4; k++) {
			var mutation = k * .25;
			if (mutation == 0) {
				mutation = 0.01;
			}
			renderInfo.innerText = "Total tests (" + (i + 1) + "/" + List.length + "): Running test (" + (k + 1) + "/4): " + List[i].label;
			renderFrame.setAttribute("src", List[i].url);
			var waitBeforeCollecting = List[i].label.includes("Angular") ? 5000 : 1000;
			await sleep(waitBeforeCollecting);
			if (!window.frames["render-frame"].contentWindow.ENV) {
				rateByMutation.push(0);
				continue;
			}
			window.frames["render-frame"].contentWindow.ENV.mutations(mutation);
			var rateData = [];

			for (var j = 0; j < collectTime; j += sleepTime) {
				await sleep(sleepTime);
				if (window.frames["render-frame"].contentWindow.Monitoring) {

					var rate = window.frames["render-frame"].contentWindow.Monitoring.renderRate.rate();
					rateData.push(rate)
				}
			}

			var sumRate = 0;
			for (var j = 0; j < rateData.length; j++) {
				sumRate += rateData[j];
			}
			var averageRate = sumRate / rateData.length;

			// var memory = 0;
			// if (window.frames["render-frame"].contentWindow.Monitoring) {
			//	 memory = window.frames["render-frame"].contentWindow.Monitoring.memoryStats.memory();
			// }
			rateByMutation.push(averageRate);
		}
		var tr = document.createElement('tr');

		switch (List[i].type) {
			case 'naive':
				tr.setAttribute('class', 'color naive');
				break;
			case 'optimized':
				tr.setAttribute('class', 'color optimized');
				break;
		}


		var td0 = document.createElement('td');
		td0.innerText = i + 1;
		tr.appendChild(td0);
		var td1 = document.createElement('td');
		td1.innerText = List[i].label;
		tr.appendChild(td1);
		for (var k = 0; k < rateByMutation.length; k++) {

			var td2 = document.createElement('td');
			td2.innerText = rateByMutation[k].toFixed(2);
			tr.appendChild(td2);
		}
		// var td3 = document.createElement('td');
		// td3.innerText = memory;
		// tr.appendChild(td3);
		document.getElementById("ranking-body").appendChild(tr);

		if (!tableSort) {
			tableSort = new Tablesort(document.getElementById('ranking'));
		}
		tableSort.refresh();

		// update number after sort
		var trs = document.getElementById('ranking').getElementsByTagName('tr')
		for (var k = 1; k < trs.length; k++) {
			trs[k].getElementsByTagName('td')[0].innerText = k;
		}
	}
	var renderBox = document.getElementById("render-box");
	renderBox.parentNode.removeChild(renderBox);
})();
