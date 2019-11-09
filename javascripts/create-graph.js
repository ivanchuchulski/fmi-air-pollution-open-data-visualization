
// parsing the csv
function parseData(createGraph) {
	Papa.parse("../data/air-data-vratsa-01-2019.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

// 
function createGraph(data) {
	let dates = [];
	let airQuallity = ["Air Quallity January"];
	// var airQuallity = [];

	// getting the data 
	for (let i = 5; i < data.length - 10; i++) {
		dates.push(data[i][2]);
		airQuallity.push(data[i][3]);
	}

	console.log(dates);
	console.log(airQuallity);


	// generating chart
	let chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	airQuallity
	        ]
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: dates,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 12
                	}
            	}
	        },

	        y: {
	        	label: { 
	        		text: 'microgram/m3',
		        	position: 'outer-middle'
		        },
		        padding: {
		        	top: 100, 
		        	bottom: 50
		        }

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