
var GET = function(sync, session, env, params) {
	var options =  	{
		json : params
	};
	var fullUrl =  env.https + session.settings.siteCode + Url();
	var res = sync('GET', fullUrl, options);
	if (res.statusCode !== 200)
		return {
			ErrorCode : res.statusCode,
		};
	var response = JSON.parse (res.getBody('utf8'));
	return {
		"ErrorCode" : response.ErrorCode,
		"userid" : response.User.idUser,
		"accessToken" : response.User.AccessToken,
		"cartid" : response.CartInfo.CartId,
		"carttoken" : response.CartInfo.CartToken
	};
};

var Url = function() {
	return '/myoox/login';
}

exports.GET = GET;
exports.Url = Url;
