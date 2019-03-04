
var ConfirmOrderOperation = function() {};

ConfirmOrderOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, 
    		function(body) { 
				if (body.Finalize.OrderNumber){
					console.log('');
				    console.log('ORDER --> ' + body.Finalize.OrderNumber);    			
				}
				return body;
			} );
    
};

ConfirmOrderOperation.prototype.Url = function() {
	return '/cart/confirmorder';
}

module.exports = new ConfirmOrderOperation();
