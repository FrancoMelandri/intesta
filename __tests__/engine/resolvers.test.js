const sut = require('../../engine/resolvers'),
    context = require('../../engine/context')()

describe('Testing resolvers', () => {

    test('Should create options for GET verb', () => {

        const operation = {
            name: 'operations',
            operation: 'api',
            url: 'theUrl',
            params: {
                query: {
                    param1: '{{{Test.param}}}',
                    param2: 'value2'
                }
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2'
            }
        }
        const session = {
            settings: {
                urls: {
                    theUrl: 'https://example.com'
                },
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'GET',
            params: {
                query: ['param1', 'param2']
            },
            headers: ['header1', 'header2']
        }
        context.add('Test', {header: 'HEADER',
            param: 'PARAM'})
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
            url: 'theUrl',
            params: {
                body: {
                    param1: '{{{Test.param}}}',
                    param2: 'value2'
                }
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2'
            }
        }
        const session = {
            settings: {
                urls: {
                    theUrl: 'https://example.com'
                }
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'POST',
            params: {
                body: ['param1', 'param2']
            },
            headers: ['header1', 'header2']
        }
        context.add('Test', {header: 'HEADER',
            param: 'PARAM'})
        const options = sut['POST'].options(context, session, api, operation)
        const expected = {
            headers: {
                header1: 'HEADER',
                header2: 'value2'
            },
            qs: {},
            json: true,
            body: {
                param1: 'PARAM',
                param2: 'value2'
            },
            method: 'POST',
            url: 'https://example.com/api'
        }
        expect(options).toMatchObject(expected)
    });

    test('Should create options for POST verb with URL ENCODING', () => {

        const operation = {
            name: 'operations',
            operation: 'api',
            url: 'theUrl',
            params: {
                body: {
                    param1: '{{{Test.param}}}',
                    param2: 'value2'
                }
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const session = {
            settings: {
                urls: {
                    theUrl: 'https://example.com'
                }
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'POST',
            params: {
                body: ['param1', 'param2']
            },
            headers: ['header1', 'header2', 'Content-Type']
        }
        context.add('Test', {header: 'HEADER',
            param: 'PARAM'})
        const options = sut['POST'].options(context, session, api, operation)
        const expected = {
            headers: {
                header1: 'HEADER',
                header2: 'value2',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
                param1: 'PARAM',
                param2: 'value2'
            },
            qs: {},
            json: true,
            method: 'POST',
            url: 'https://example.com/api'
        }
        expect(options).toMatchObject(expected)
    });

    test('Should create options for PUT verb', () => {

        const operation = {
            name: 'operations',
            operation: 'api',
            url: 'theUrl',
            params: {
                body: {
                    param1: '{{{Test.param}}}',
                    param2: 'value2'
                }
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2'
            }
        }
        const session = {
            settings: {
                urls: {
                    theUrl: 'https://example.com'
                }
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'POST',
            params: {
                body: ['param1', 'param2']
            },
            headers: ['header1', 'header2']
        }
        context.add('Test', {header: 'HEADER',
            param: 'PARAM'})
        const options = sut['PUT'].options(context, session, api, operation)
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

    test('Should create options for DELETE verb', () => {

        const operation = {
            name: 'operations',
            operation: 'api',
            url: 'theUrl',
            params: {
                body: {
                    param1: '{{{Test.param}}}',
                    param2: 'value2'
                }
            },
            headers: {
                header1: '{{{Test.header}}}',
                header2: 'value2'
            }
        }
        const session = {
            settings: {
                urls: {
                    theUrl: 'https://example.com'
                }
            }
        }
        const api = {
            name: 'api',
            path: '/api',
            verb: 'DELETE',
            params: {
                body: ['param1', 'param2']
            },
            headers: ['header1', 'header2']
        }
        context.add('Test', {header: 'HEADER',
            param: 'PARAM'})
        const options = sut['DELETE'].options(context, session, api, operation)
        const expected = {
            headers: {
                header1: 'HEADER',
                header2: 'value2'
            },
            body: {
                param1: 'PARAM',
                param2: 'value2'
            },
            method: 'DELETE',
            url: 'https://example.com/api'
        }
        expect(options).toMatchObject(expected)
    });
});
