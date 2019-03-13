# intesta

**INTE**gration te**ST** **A**utomation



Input parameters

| Parameter        | Description                                 |
| :--------------- | :------------------------------------------ |
| **--descriptor** | file descriptor of the api resources schema |
| **--session**    | file containing the session of the test     |




Example about using intesta:


```javascript
const intesta = require('@francomelandri/intesta'),
    path = require('path')

const onSuccess = operation => {
    console.log (operation.name + ' OK')
}

const onFail = (operation, assertion) => {
    console.log (operation.name + ' FAIL')
}

const descriptorFile = path.join(__dirname, './descriptor.json')
const sessionFile = path.join(__dirname, './session.json')

intesta(descriptorFile, sessionFile, onSuccess, onFail)
```


Example of API descriptor file. This file define the schema of the resource API **intesta** is able to know.

```json
{
	"apis": [
        {
            "name": "keepAlive",
            "path": "/keepalive",
            "verb": "GET",
            "params": ["param1", "param2"],
            "headers": ["User-Agent", "Accept"]
        },
        {
            "name": "whoAmI",
            "path": "/whoami",
            "verb": "GET",
            "params": ["name", "surname"],
            "headers": ["User-Agent", "Accept", "X-Auth"]
        },
        {
            "name": "AreYou",
            "path": "/areyou",
            "verb": "POST",
            "params": ["name", "surname"],
            "headers": ["User-Agent", "Content-Type", "Accept", "X-Auth"]
        }
    ]
}
```


Example of API session file. 
This file contains the description of the flow for the test **intesta** should perform

```json
{
	"settings":{
		"environment" : "PROD",
		"url": "http://q7vv6.mocklab.io",
		"userAgent": "Chrome"
	},
	"operations" : [
		{
			"name" : "keepAlive_1",
			"operation": "keepAlive",
			"params": {
                "param1": "value1",
                "param2": "value2"
			},
			"headers": {
				"User-Agent": "{{{settings.userAgent}}}",
				"Accept": "application/json"
			}
        },
		{
			"name" : "WhoAmI_1",
			"operation": "whoAmI",
			"params": {
				"name": "{{{keepAlive_1.name}}}",
                "surname": "Melandri"
			},
			"headers": {
                "User-Agent": "{{{settings.userAgent}}}",
				"Accept": "application/json",
				"X-Auth": "{{{keepAlive_1.Auth}}}"
			},
			"assertions":[
				{
					"field": "{{{WhoAmI_1.message}}}",
					"comparison": "eq",
					"value": "Hello World"
				}
			]
        },
		{
			"name" : "AreYou_1",
			"operation": "AreYou",
			"params": {
				"name": "{{{keepAlive_1.name}}}",
                "surname": "Melandri"
			},
			"headers": {
                "User-Agent": "{{{settings.userAgent}}}",
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Auth": "{{{keepAlive_1.Auth}}}"
			},
			"assertions":[
				{
					"field": "{{{AreYou_1.message}}}",
					"comparison": "eq",
					"value": "Yes you are"
				}
			]
        }
    ]
}
```
