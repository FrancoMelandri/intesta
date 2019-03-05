const sut = require('../../engine/loader');

describe('Testing API loader', () => {

    test('Should load resources', () => {
        let resources = sut('../__tests__/engine/test.descriptor.json')
        expect(resources.length).toBe(1);
    });

    test('Should load resource as expected', () => {
        let resources = sut('../__tests__/engine/test.descriptor.json')
        let keepAlive = resources.find(item => item.name == 'keepAlive')
        expect(keepAlive.path).toBe('/keepAlive');
        expect(keepAlive.verb).toBe('GET');
        expect(keepAlive.params.length).toBe(2);
        expect(keepAlive.headers.length).toBe(2);
        expect(keepAlive.params[0]).toBe('param1');
        expect(keepAlive.params[1]).toBe('param2');
        expect(keepAlive.headers[0]).toBe('header1');
        expect(keepAlive.headers[1]).toBe('header2');
    });
});
