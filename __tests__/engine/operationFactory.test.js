const sut = require('../../engine/operationFactory'),
    context = require('../../engine/context')()

jest.mock('request', () => ((options, callback) => {
    expect(options.headers['User-Agent']).toBe('Chrome')
    expect(options.method).toBe('GET')
    expect(options.qs.param1).toBe('test')
    expect(options.qs.param2).toBe('value2')
    callback(null, null, '{"status": "OK"}')
}))

describe('Testing operation factory', () => {

    test('Should create the right operation handler', () => {

        const operation = {
            name: 'keepAlive_1',
            operation: 'keepAlive',
            params: {
                param1: '{{{Test_1.value}}}',
                param2: 'value2'
            },
            headers: {
                'User-Agent': 'Chrome'
            }
        }
        const apis = [{
            name: 'keepAlive',
            path: '/keepalive',
            verb: 'GET',
            params: ['param1', 'param2'],
            headers: ['User-Agent']
        }]
        const session = {
            settings: {
                url: 'URl',
                userAgent: 'Chrome'
            }
        }
        context.add('Test_1', {value: 'test'})
        context.add('settings', session.settings)
        sut(context, operation, session, apis,
            (_, res) => { expect(res.status).toBe('OK') },
            _ => { expect(false).toBe(true) })(() => {})

    });

});
