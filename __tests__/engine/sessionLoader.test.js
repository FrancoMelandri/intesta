const sut = require('../../engine/sessionLoader'),
    resources = require('../../engine/apiLoader')('../__tests__/engine/test.descriptor.json');

describe('Testing session loader', () => {

    test('Should initialize environment', () => {
        let session = sut('../__tests__/engine/test.session.json', resources)
        expect(session.settings.environment).toBe('PROD');
    });
});
