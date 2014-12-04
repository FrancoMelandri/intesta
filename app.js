angular.module('yate', [])
    .config(['$httpProvider', '$provide', function ($httpProvider, $provide) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        var ops ={
            "keepAlive": {
                "url": "/keepAlive",
                "verb" : "get",
                "params": []
            },
            "login": {
                "url": "/myoox/login",
                "verb" : "post",
                "params": ["email", "password"]
            },
            "cart": {
                "url": "/cart",
                "verb" : "get",
                "params": ["userid", "accessToken", "cartid", "carttoken"]
            }
        };

        $provide.value('OperationSet', ops);
    }]);