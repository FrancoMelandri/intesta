
var KeepAliveOperation = function() {};

KeepAliveOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		url : env.http + operation.session.settings.siteCode + operation.url,
	};
	request(options, function(err, response, body) {
        if(err) { 
            console.log(err);
        	callback(true, { 
                            ErrorCode : 500,
				            ErrorMessage : err,
			             }); 
        	return; 
        }
        var result = {ErrorCode : response.statusCode};
        var check = operation.check(result);
        if (check) {
        	callback(true, check);
        	return;
        }
        operation.context.results[operation.name] = result;
        callback(false, result);
      });
};

KeepAliveOperation.prototype.Url = function() {
	return '/keepAlive';
}

module.exports = new KeepAliveOperation();
