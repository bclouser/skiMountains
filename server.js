var express = require('express');
var fs = require('fs');
//var request = require('request');
var https = require('https');
var cheerio = require('cheerio');
var app     = express();

var washingtonMtnNames = [
	"crystal-mountain-wa",
	"stevens-pass-resort",
	"the-summit-at-snoqualmie",
	"mt-baker"
]


var GetMountainStats = function(mountainName, callback){
	var url = 'https://www.onthesnow.com/washington/'+mountainName+'/skireport.html'
	https.get(url, (res) => {
		//console.log('statusCode:', res.statusCode);
		//console.log('headers:', res.headers);
		var webPage = '';
		var snowToday = ''
		res.on('data', function (chunk) {
			webPage += chunk;
	    });
		res.on('end', function () {
		    var $ = cheerio.load(webPage);
		    // Strip special chars and convert to number
		    var snowTodayInches = Number($('.sr_snowfall_days li.today div.predicted_snowfall div').text().replace(/[^a-zA-Z0-9]/g,''));
		    var status = $("div#snow_conditions li span.current_status").text();
		    console.log("temperatureSummit:");
		    console.log($('li.station.base div.weather div.temp').text());
		    data = {
		    	"name":mountainName,
		    	"snowTodayInches":snowTodayInches,
		    	"temperatureSummit":$('li.station.summit div.weather div.temp').text(),
		    	"temperatureBase":$('li.station.base div.weather div.temp').text(),
		    	"weatherSummit":$("li.station.summit div.weather div.icon").attr("title"),
		    	"weatherBase":$("li.station.base div.weather div.icon").attr("title"),
		    	"open":(status=="Open"),
		    };
		    callback('', data);
		});
		res.on('error', (e) => {
			callback(e, {});
		});
	});
};

function GetAllWashingtonMtns(callback){
	for(var i in washingtonMtnNames){
		var numMtnsProcessed = 0;
		var mountainData = {};
		console.log("Fetching " + washingtonMtnNames[i]);
		GetMountainStats(washingtonMtnNames[i], function(err, data){
			if(err){
				console.log("Failed to get data for " + washingtonMtnNames[i] );
				callback(err, {});
				return;
			}
			mountainData[data.name] = data;
			// Once we reach the end of the list, callback
			if(numMtnsProcessed == (washingtonMtnNames.length-1)){
				callback('', mountainData);
			}
			numMtnsProcessed += 1;
		});
	}
}

app.get('/validMtns', function(req, response){
	response.send(JSON.stringify(washingtonMtnNames));
});

app.get('/washingtonMtns', function(req, response){
	GetAllWashingtonMtns(function(err, data){
		if(err){
			console.log("Failed to get all mountain data:");
			console.log(err);
			response.send(err);
			return;
		}
		response.send(JSON.stringify(data));
	});
})

app.get('/:mtnName', function(req, response){
	var mountainName = req.params.mtnName;
	GetMountainStats(mountainName, function(err, data){
		if(err){
			console.log("Failed to get data for " + mountainName);
			callback(err, {});
			return;
		}
		response.send(JSON.stringify(data));
	});
})

app.listen('8081')

console.log('Server listening on port 8081');

exports = module.exports = app;
