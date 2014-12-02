
var GET = function(sync, session, env, params) {
	var options = {
		qs : params
	};
	var fullUrl =  env.https + session.settings.siteCode + Url();
	var res = sync('GET', fullUrl, options);
	if (res.statusCode !== 200)
		return {
			ErrorCode : res.statusCode,
		};
	return JSON.parse (res.getBody('utf8'));
};

var Url = function() {
	return '/cart';
}

exports.GET = GET;
exports.Url = Url;
