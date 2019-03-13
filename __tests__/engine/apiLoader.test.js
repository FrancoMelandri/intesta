const sut = require('../../engine/apiLoader');

describe('Testing API loader', () => {

    test('Should load resources', () => {
        let resources = sut('../__tests__/engine/data/test.descriptor.json')
        expect(resources.length).toBe(3);
    });

    test('Should load resource as expected', () => {
        let resources = sut('../__tests__/engine/data/test.descriptor.json')
        let keepAlive = resources.find(item => item.name == 'keepAlive')
        expect(keepAlive.path).toBe('/keepalive');
        expect(keepAlive.verb).toBe('GET');
        expect(keepAlive.params.length).toBe(2);
        expect(keepAlive.headers.length).toBe(2);
        expect(keepAlive.params[0]).toBe('param1');
        expect(keepAlive.params[1]).toBe('param2');
        expect(keepAlive.headers[0]).toBe('User-Agent');
        expect(keepAlive.headers[1]).toBe('Accept');
    });
});
