# intesta

------



**INTE**gration te**ST** **A**pi

[![Build Status](https://travis-ci.org/FrancoMelandri/intesta.svg?branch=master)](https://travis-ci.org/FrancoMelandri/intesta) [![NPM version](https://img.shields.io/npm/v/@francomelandri/intesta.svg?style=flat)](https://www.npmjs.com/package/@francomelandri/intesta) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Input parameters

| Parameter        | Description                                 |
| :--------------- | :------------------------------------------ |
| **descriptorFile** | file descriptor of the api resources schema |
| **sessionFile**    | file containing the session of the test     |
| **onSuccess** | callback function in case of assertions are right |
| **onFail** | callback function in case of failed assertion |
| **onFail** | callback function called by intesta in some particular cases. Allows you to add you custom log to the application |





---



### How to



Example about using **intesta**


```javascript
const intesta = require('@francomelandri/intesta'),
    path = require('path')

const onSuccess = operation => {
    console.log(operation.name + ' OK')
}

const onFail = (operation, assertion) => {
    console.log(operation.name + ' FAIL')
}

const onLog = (type, message) => {
    console.log(type + ' ' + JSON.stringify(message))
}

const descriptorFile = path.join(__dirname, './descriptor.json')
const sessionFile = path.join(__dirname, './session.json')

intesta(descriptorFile, sessionFile, onSuccess, onFail, onLog)
```



Example of API descriptor file. This file define the schema of the resource API **intesta** is able to know.

```json
{
	"apis": [
        {
            "name": "keepAlive",
            "path": "/keepalive",
            "verb": "GET",
            "params": {
              "query": ["param1", "param2"]
            },
            "headers": ["User-Agent", "Accept"]
        },
        {
            "name": "whoAmI",
            "path": "/whoami",
            "verb": "GET",
            "params": {
              "query": ["name", "surname"]
            },
            "headers": ["User-Agent", "Accept", "X-Auth"]
        },
        {
            "name": "AreYou",
            "path": "/areyou",
            "verb": "POST",
            "params": {
              "body": ["name", "surname"]
            },
            "headers": ["User-Agent", "Content-Type", "Accept", "X-Auth"]
        }
    ]
}
```



| field            | description                                                  |
| ---------------- | ------------------------------------------------------------ |
| name             | a unique name of the api resource used by session operation  |
| path             | the relative path of the resource                            |
| verb             | the HTTP verb for the resource; at the moment the allowable verbs are: GET, POST, PUT, DELETE in order to let you bale to test a CRUD api |
| params **query** | contain the list of all possible parameter for query string  |
| params **body**  | contain the list of all possible parameter for body          |
| headers          | list of headers needed to use the resource                   |



Example of API session file. 
This file contains the description of the flow for the test **intesta** should perform

```json
{
	"settings":{
		"environment" : "PROD",
		"urls": {
      "test": "http://q7vv6.mocklab.io"
    },
		"userAgent": "Chrome"
	},
	"operations" : [
		{
			"name" : "keepAlive_1",
			"operation": "keepAlive",
      "url": "test",
			"params": {
        "query": {
          "param1": "value1",
          "param2": "value2"
        }
			},
			"headers": {
				"User-Agent": "{{{settings.userAgent}}}",
				"Accept": "application/json"
			}
    },
		{
			"name" : "WhoAmI_1",
			"operation": "whoAmI",
      "url": "test",
			"params": {
        "query": {
					"name": "{{{keepAlive_1.name}}}",
          "surname": "Melandri"
        }
			},
			"headers": {
				"User-Agent": "{{{settings.userAgent}}}",
				"Accept": "application/json",
				"X-Auth": "{{{keepAlive_1.Auth}}}"
			},
			"assertions": [
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
      "url": "test",
			"params": {
        "body": {
  				"name": "{{{keepAlive_1.name}}}",
          "surname": "Melandri"          
        }
			},
			"headers": {
        "User-Agent": "{{{settings.userAgent}}}",
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Auth": "{{{keepAlive_1.Auth}}}"
			},
			"assertions": [
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



| field      | description                                                  |
| ---------- | ------------------------------------------------------------ |
| name       | a unique name for the operation. It can be used by other operation to retrieve field value using the mustache notation |
| operation  | link to api resource description to validate the operation itself |
| url        | the url the operation should use to issue the request. The list of url should be defined into the settings object. |
| params     | list of parameters values for both **query** and **body** as you defined in the descriptor file; you can use mustache notation for dynamic values |
| headers    | list of headers values; you can use mustache notation for dynamic values |
| assertions | list of assertions description in order to check if the api resource response is valid or not. |
|            | field: the response field value to check                     |
|            | comparison: could be **eq** or **neq**                       |
|            | value: the expected value                                    |



### Mustache

You can refer to operation output in each session field value using the mustache annotation

In the previous session example you can see 

```json
...
		"assertions":[
				{
					"field": "{{{AreYou_1.message}}}",
					"comparison": "eq",
					"value": "Yes you are"
				}
			]
...
```



that means the field is the evaluation of the response field message of the AreYou_1 operation.

In this way you can link output values of some operations to input value of another; it is very useful to concatenate a list of operations creating a flow.