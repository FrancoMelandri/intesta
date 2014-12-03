var AsyncQueueModule = require('./AsyncQueue.js');
var querystring = require('querystring');
var http = require('http');

var context = {};

var queue = new AsyncQueueModule.AsyncQueue(context, function(){
    console.log("ho finito tutti gli step");
});

var request = require('request');

request.post(
    'http://rc.api.yoox.net/YooxCore.API/1.0/yoox_it/myoox/login', {
        form: {
        "login": "test.it@yoox.com",
        "password": "password"
    }},
    function (error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body);
    }
);