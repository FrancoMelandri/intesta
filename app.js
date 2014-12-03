angular.module('yate', [])
    .config(['$httpProvider', '$provide', function ($httpProvider, $provide) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        var ops ={
            "keepAlive": {
                "url": "/keepAlive",
                "verb" : "GET",
                "params": []
            },
            "login": {
                "url": "/myoox/login",
                "verb" : "POST",
                "params": ["email", "password"]
            },
            "cart": {
                "url": "/cart",
                "verb" : "GET",
                "params": ["userid", "accessToken", "cartid", "carttoken"]
            }
        };

        $provide.value('OperationSet', ops);
    }]);