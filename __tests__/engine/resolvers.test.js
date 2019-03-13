const sut = require('../../engine/resolvers'),
    context = require('../../engine/context')()

describe('Testing resolvers', () => {

    test('Should create options for GET verb', () => {

        const operation = {
            name: 'operations',
            operation: 'api',
            params: {
                param1: '{{{Test.param}}}',
                param2: 'value2'
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2'
            }
        }
        const session = {
            settings: {
                url: 'https://example.com'
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'GET',
            params: ['param1', 'param2'],
            headers: ["header1", "header2"]
        }
        context.add('Test', {header: 'HEADER', param: 'PARAM'})
        const options = sut['GET'].options(context, session, api, operation)
        const expected = {
            headers: {
                header1: 'HEADER',
                header2: 'value2'
            },
            qs: {
                param1: 'PARAM',
                param2: 'value2'
            },
            method: 'GET',
            url: 'https://example.com/api'
        }
        expect(options).toMatchObject(expected)
    });

    test('Should create options for POST verb', () => {

        const operation = {
            name: 'operations',
            operation: 'api',
            params: {
                param1: '{{{Test.param}}}',
                param2: 'value2'
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2'
            }
        }
        const session = {
            settings: {
                url: 'https://example.com'
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'POST',
            params: ['param1', 'param2'],
            headers: ["header1", "header2"]
        }
        context.add('Test', {header: 'HEADER', param: 'PARAM'})
        const options = sut['POST'].options(context, session, api, operation)
        const expected = {
            headers: {
                header1: 'HEADER',
                header2: 'value2'
            },
            body: {
                param1: 'PARAM',
                param2: 'value2'
            },
            method: 'POST',
            url: 'https://example.com/api'
        }
        expect(options).toMatchObject(expected)
    });
});
