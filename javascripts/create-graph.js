
// parsing the csv using papaparse
function parseData(createGraph) {
	Papa.parse("../data/air-data-vratsa-01-2019.csv", {
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
	let dates = ["x"];
	let airQuallity = ["Януари"];

	// getting the data 
	for (let i = 5; i < data.length - 10; i++) {
		dates.push(data[i][2]);
		airQuallity.push(data[i][3]);
	}

	// reformatting the delimiter
	// changeDateDelimiter(dates);

	// console.log(dates);
	// console.log(airQuallity);

	// let testdate1 = ["x", "2013-01-01", "2013-01-02", "2013-01-03"];
	// let data1 = ["data1", "30", "200", "100"];

	// console.log(testdate1);
	// console.log(data1);


	// generating chart
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        x: 'x',
	    	xFormat: '%Y/%m/%d', // 'xFormat' can be used as custom format of 'x'
	        columns: [
	        	dates,
	        	airQuallity
	        ]
	    },
	    axis: {
	        x: {
	            type: 'timeseries',
	            tick: {
	                format: '%Y-%m-%d',
	                culling: { max: 12 }
	            }
	        },

	        y: {
	        	label: { 
	        		text: 'Ниво на Фини прахови частици',
		        	position: 'outer-middle'
				},
				
				tick: {
	               format: function (d) { return d + "µg/m3"; }
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
					{value: 50, text: 'norm', position: 'middle'},
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


