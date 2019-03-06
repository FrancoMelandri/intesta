const sut = require('../../engine/operationFactory')

jest.mock('request', () => ((options, callbac) => {
    expect(options.method).toBe('GET')
    callbac(null, null, '{ "status": "OK"}')
}))

describe('Testing operation factory', () => {

    test('Should load resources', () => {

        const operation = {
			name: "keepAlive_1",
			operation: "keepAlive",
			params: {
                param1: "value1",
                param2: "value2"
			}
        }
        const apis = [{
            name: "keepAlive",
            path: "/keepalive",
            verb: "GET",
            params: ["param1", "param2"]
        }]
        const session = {
            settings: {
                url: "URl",
                userAgent: "Chrome"
            }
        }
        sut(operation, session, apis)(_ => { expect(false).toBe(true) }, 
                                      _ => { expect(_.status).toBe("OK") })

    });

});
