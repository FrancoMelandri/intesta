var CartOperation = function() {};

CartOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		qs : params,
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
	request(options, function(err, response, body) {
        if(err) { 
        	callback(true, {
        		ErrorCode : 500,
			}); 
        	return; 
        }        
        var check = operation.check(body);
        if (check) {
        	callback(true, check);
        	return;
        }
        operation.context.results[operation.name] = body;
        callback(false, body);
      });
};


CartOperation.prototype.Url = function() {
	return '/cart';
}

module.exports = new CartOperation();
