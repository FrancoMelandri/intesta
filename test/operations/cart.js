
var Do = function(sync, session, env, verb, url, params) {
	var options = {
		qs : params
	};
	var fullUrl =  env.https + session.settings.siteCode + url;
	var res = sync(verb, fullUrl, options);
	if (res.statusCode !== 200)
		return {
			ErrorCode : res.statusCode,
		};
	return JSON.parse (res.getBody('utf8'));
};

var Url = function() {
	return '/cart';
}

exports.Do = Do;
exports.Url = Url;
