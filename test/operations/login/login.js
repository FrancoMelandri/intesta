
var Do = function(sync, session, env, verb, url, params) {
	var options =  	{
		json : params
	};
	var fullUrl =  env.https + session.settings.siteCode + url;
	var res = sync(verb, fullUrl, options);
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

exports.Do = Do;