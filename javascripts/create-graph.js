// TODO 
// handle missing data
// 		use predefined value
// 

// parsing the csv using papaparse
function parseData(quarterToDisplay) {
	let files = [];
	let allResults = [];

	switch (quarterToDisplay) {
		case 1:
			files.push('../data/air-quality-pleven-01-2018.csv');
			files.push('../data/air-quality-pleven-02-2018.csv');
			files.push('../data/air-quality-pleven-03-2018.csv');
			break;
		case 2:
			files.push('../data/air-quality-pleven-04-2018.csv');
			files.push('../data/air-quality-pleven-05-2018.csv');
			files.push('../data/air-quality-pleven-06-2018.csv');
			break;
		case 3:
			files.push('../data/air-quality-pleven-07-2018.csv');
			files.push('../data/air-quality-pleven-08-2018.csv');
			files.push('../data/air-quality-pleven-09-2018.csv');
			break;
		case 4:
			files.push('../data/air-quality-pleven-10-2018.csv');
			files.push('../data/air-quality-pleven-11-2018.csv');
			files.push('../data/air-quality-pleven-12-2018.csv');
			break;
	}

	// calling paparse for each file
	for (let i = 0; i < files.length; i++) {
		Papa.parse(files[i], {
			download: true,
			complete: function(results) {
				allResults.push(results.data)

				// callback to the prepareData method
				if (allResults.length == files.length) {
					prepareData(allResults, quarterToDisplay);
				}
			}
		});
	}
}

function prepareData(parsedData, quarter) {
	let parsedFirst = parsedData[0];
	let parsedSecond = parsedData[1];
	let parsedThird = parsedData[2];
	let limit1 = parsedFirst.length;
	let limit2 = parsedSecond.length;
	let limit3 = parsedThird.length;

	// date month is fixed, but we dispay only the days 
	let dates = ["x", "1/1/2018", "1/2/2018", "1/3/2018", "1/4/2018", "1/5/2018", "1/6/2018", "1/7/2018",
	 "1/8/2018", "1/9/2018", "1/10/2018", "1/11/2018", "1/12/2018", "1/13/2018", "1/14/2018", "1/15/2018", 
	 "1/16/2018", "1/17/2018", "1/18/2018", "1/19/2018", "1/20/2018", "1/21/2018", "1/22/2018", "1/23/2018", 
	 "1/24/2018", "1/25/2018", "1/26/2018", "1/27/2018", "1/28/2018", "1/29/2018", "1/30/2018", "1/31/2018"];

	let first = [];
	let second = [];
	let third = [];

	let timesFirst = [];
	let timesSecond = [];
	let timesThird = [];

	switch (quarter) {
		case 1:
			first.push('Януари');
			second.push('Февруари');
			third.push('Март');

			timesFirst.push('Януари');
			timesSecond.push('Февруари');
			timesThird.push('Март');
			break;
		case 2:
			first.push('Април');
			second.push('Май');
			third.push('Юни');

			timesFirst.push('Април');
			timesSecond.push('Май');
			timesThird.push('Юни');
			break;
		case 3:
			first.push('Юли');
			second.push('Август');
			third.push('Септември');

			timesFirst.push('Юли');
			timesSecond.push('Август');
			timesThird.push('Септември');
			break;
		case 4:
			first.push('Октомври');
			second.push('Ноември');
			third.push('Декември');

			timesFirst.push('Октомври');
			timesSecond.push('Ноември');
			timesThird.push('Декември');
			break;
	}

	// 
	for (let i = 0; i < limit1; i++) {
		first.push(parsedFirst[i][3]);
		timesFirst.push(parsedFirst[i][4]);
	}
	for (let i = 0; i < limit2; i++) {
		second.push(parsedSecond[i][3]);
		timesSecond.push(parsedSecond[i][4]);
	}
	for (let i = 0; i < limit3; i++) {
		third.push(parsedThird[i][3]);
		timesThird.push(parsedThird[i][4]);
	}

	// checks
	// console.log(parsedData);
	// console.log(parsedFirst);

	// console.log("dates");
	// console.log(dates);

	// console.log("first");
	// console.log(first);

	// console.log("second");
	// console.log(second);

	// console.log("third");
	// console.log(third);

	createGraph(quarter, dates, first, second, third, timesFirst, timesSecond, timesThird);
}

// creating graph using c3js
function createGraph(quarter, dates, first, second, third, timesFirst, timesSecond, timesThird) {
	let firstQuarterColors = ['#e37302', '#02e364', '#0255e3'];
	let secondQuarterColors = ['#fd8c1c', '#1cfd7d', '#1c6efd'];
	let thirdQuarterColors = ['#fda64e', '#4efd9a', '#4e8efd'];
	let forthQuarterColors = ['#b15902', '#02b14e', '#0242b1'];
	let colorsDoDisplay;

	switch (quarter) {
		case 1:
			colorsDoDisplay = firstQuarterColors;
			break;
		case 2:
			colorsDoDisplay = secondQuarterColors;
			break;
		case 3:
			colorsDoDisplay = thirdQuarterColors;
			break;
		case 4:
			colorsDoDisplay = forthQuarterColors;
			break;
	}

	let chart = c3.generate({
		bindto: '#chart',

		size: { 
			height : 500,
			width : 1700
		},
		
		color: {
			pattern: colorsDoDisplay
		},

	    data: {
	        x: 'x',
	    	xFormat: '%m/%d/%Y',
			columns: [ dates, first ]
		},

	    axis: {
	        x: {
	            type: 'timeseries',
	            tick: {
	                format: '%Y-%d',
					culling: { 
						max: 12 
					}
				},
				label: {
					text: 'дати от месеца',
					position: 'outer-right'
				}
	        },
	        y: {
				tick: {
	               format: function (d) { return d + "µg/m3"; }
				},
				label: { 
	        		text: 'Ниво на Фини прахови частици',
		        	position: 'outer-middle'
				},
		        padding: {
		        	top: 100, 
		        	bottom: 50
				},
		    }
	    },

		grid: {
			y: {
				lines: [
					{value: 50, text: 'макс допустима', position: 'start'},
				]
			}
		},

		zoom: {
			enabled: true
		},
		
		legend: {
	        position: 'bottom'
	    }
	});

	// loading second data
	setTimeout(function () {
		chart.load({
			columns: [ second ]
		});
	}, 2000);

	// loading third data
	setTimeout(function () {
		chart.load({
			columns: [ third ]
		});
	}, 3000);

	// --------second phase--------
	// remove y grid label
	setTimeout(function () {
		chart.ygrids.remove({value:50});
	}, 5000);
	
	// rename y label
	setTimeout(function () {
		chart.axis.labels({y: 'превишение в пъти'});
	}, 5000);
	
	// try to format the y ticks
	setTimeout(function () {
		chart.axis.tick({y: {format: function (d) { return d + "пъти"; }}});
	}, 5000);

	// unload data with callback to loading
	setTimeout(function() {
		chart.unload({
		  done: function() {
			chart.load({ 
			  columns: [ timesFirst, timesSecond, timesThird ],
			  type: 'bar' 
			});  
		  }
		});
	  }, 5000);

	// // --------third phase--------
	// add y grid label
	setTimeout(function () {
		chart.ygrids.add({value:50, text: 'макс допустима', position: 'start'});
	}, 7000);

	// rename y label to the original
	setTimeout(function () {
		chart.axis.labels({y: 'Ниво на Фини прахови частици'});
	}, 7000);

	setTimeout(function() {
		chart.unload({
		  done: function() {
			chart.load({ 
			  columns: [
				first, second, third
			  ],
			  type: 'line' 
			});  
		  }
		});
	}, 7000);

	// setTimeout(function () {
	// 	chart.load({
	// 		unload: [first, second, third]
	// 	});
	// }, 4000);

	// setTimeout(function () {
	// 	chart.load({
	// 		columns:[ timesFirst ],
	// 		type: 'bar'
	// 	});
	// }, 4500);

	// setTimeout(function () {
	// 	chart.load({
	// 		columns: [ timesSecond ],
	// 		type: 'bar'
	// 	});
	// }, 5500);

	// setTimeout(function () {
	// 	chart.load({
	// 		columns: [ timesThird ],
	// 		type: 'bar'
	// 	});
	// }, 6000);


	// setTimeout(function () {
	// 	chart.load({
	// 		unload: true,
	// 	});
	// }, 7000);


	// setTimeout(function () {
	// 	chart.transform('timeseries', first);
	// }, 7000);


	// setTimeout(function () {
	// 	chart.load({
	// 		columns: [ third ],
	// 		type: 'timeseries'
	// 	});
	// }, 8500);
}


// entry point, pass in the desired quaterNumber
// parseData(1);