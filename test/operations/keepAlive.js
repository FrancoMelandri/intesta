

var GET = function(sync, session, env, params) {
	
	var fullUrl =  env.http + session.settings.siteCode + Url();
	var res = sync('GET', fullUrl);
	return {
		ErrorCode : res.statusCode,
		ErrorMessage : res.getBody('utf8'),
	};
};

var Url = function() {
	return '/keepAlive';
}

exports.GET = GET;
exports.Url = Url;

