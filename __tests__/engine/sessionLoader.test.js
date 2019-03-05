const sut = require('../../engine/sessionLoader'),
    resources = require('../../engine/apiLoader')('../__tests__/engine/data/test.descriptor.json');

describe('Testing session loader', () => {

    test('Should initialize environment', () => {
        let session = sut('../__tests__/engine/data/test.session.json', resources)
        expect(session.settings.environment).toBe('PROD');
    });

    test('Should initialize operations', () => {
        let session = sut('../__tests__/engine/data/test.session.json', resources)
        expect(session.operations.length).toBe(1);
        expect(session.operations[0].name).toBe('keepAlive_1');
        expect(session.operations[0].operation).toBe('keepAlive');
        expect(session.operations[0].params['param1']).toBe('value1');
        expect(session.operations[0].params['param2']).toBe('value2');
        expect(session.operations[0].headers['header1']).toBe('value1');
        expect(session.operations[0].headers['header2']).toBe('value2');
    });

    test('Should not initialize session if wrong api declaration', () => {
        try {
            sut('../__tests__/engine/data/test.sessionWrong.json', resources)
            expect(false).toBe(true);
        } catch (e) {
            expect(e).toBe('No api defined for keepAlive1');
        }
    });
});
