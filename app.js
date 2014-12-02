angular.module('yate', [])
    .config(['$provide', function ($provide) {
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