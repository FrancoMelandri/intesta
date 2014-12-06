
var AccountOperation = function () {};

AccountOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		qs : params,
		method : "GET",
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

AccountOperation.prototype.PUT = function(request, operation, params, callback) {
    
    var env = operation.env;
    var options = {
        qs : params,
        method : "PUT",
        url : env.https + operation.session.settings.siteCode + operation.url,
    };
    request(options, function(err, response, body) {
        if(err) { 
            callback(true, {
                ErrorCode : err,
                ErrorMessage : body,
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


AccountOperation.prototype.Url = function() {
	return '/myoox/Account';
}

module.exports = new AccountOperation();
