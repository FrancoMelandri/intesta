

var request = require('request');
var async = require('async');

var series = [];

series.push(function(callback) {
   	  console.log('--> first');
      var url = "http://api.yoox.biz/YooxCore.API/1.0/YOOX_IT/KeepAlive";
      request(url, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = body + '1';
        console.log('first ' + obj);
        callback(false, obj);
      });
   	  console.log('<-- first');
    });

series.push( function(callback) {
   	  console.log('--> second');
      var url = "http://api.yoox.biz/YooxCore.API/1.0/YOOX_IT/KeepAlive";
      request(url, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = body + '2';
        console.log('second ' + obj);
        callback(false, obj);
      });
   	  console.log('<-- second');
    });

var handler = function() {
  async.series( series,
  function(err, results) {
    if(err) { console.log(err); return; }
    console.log (results[0]);
    console.log (results[1]);
  }
  );
};



handler();
