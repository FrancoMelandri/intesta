

var Do = function(sync, session, env, verb, url, params) {
	
	var fullUrl =  env.http + session.settings.siteCode + url;
	var res = sync(verb, fullUrl);
	return {
		ErrorCode : res.statusCode,
		ErrorMessage : res.getBody('utf8'),
	};
};

exports.Do = Do;

