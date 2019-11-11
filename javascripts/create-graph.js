// parsing the csv using papaparse
function parseData(createGraph) {
	Papa.parse("../data/air-quality-pleven-01-03-2018.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

String.prototype.replaceAll = function(str1, str2, ignore)  {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

function changeDateDelimiter(dates) {
	for (let j = 0; j < dates.length; j++) {
		dates[j] = dates[j].replaceAll('/', '-');
	}
}

// creating graph using c3js
function createGraph(data) {
	let januaryNumberOfDays = 31;
	let februaryNumberOfDays = januaryNumberOfDays + 28;
	let marhcNumberOfDays = februaryNumberOfDays + 31;

	let dates = ["x"];
	let january = ["Януари"];
	let february = ["Февруари"];
	let march = ["Март"];

	// getting the data 
	for (let i = 0; i < januaryNumberOfDays; i++) {
		dates.push(data[i][2]);
		january.push(data[i][3]);
	}
	for (let i = januaryNumberOfDays; i < februaryNumberOfDays; i++) {
		february.push(data[i][3]);
	}
	for (let i = februaryNumberOfDays; i < marhcNumberOfDays; i++) {
		march.push(data[i][3]);
	}

	// console.log(data);
	// console.log(dates);
	// console.log(january);
	// console.log(february);
	// console.log(march);


	// let colors = ['#ff0000', '#00ff00','#03fcb6'];

	// generating chart
	let chart = c3.generate({
		bindto: '#chart',
	    data: {
	        x: 'x',
	    	xFormat: '%m/%d/%Y', // 'xFormat' can be used as custom format of 'x'
	        columns: [
	        	dates,
				january,
				february,
				march
			],
		},
		
	    axis: {
	        x: {
	            type: 'timeseries',
	            tick: {
	                format: '%Y-%d',
					culling: { max: 12 }
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
}

parseData(createGraph);

