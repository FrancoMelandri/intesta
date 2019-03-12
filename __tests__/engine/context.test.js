const sut = require('../../engine/context')();

describe('Testing context', () => {

    test('Should add new entry to context', () => {
        sut.add ( 'test', { status: 'OK'})
        let expected = { test: { status: 'OK'} }
        expect(sut.current()).toMatchObject(expected);
    });

    test('Should add new complex entry to context', () => {
        sut.add ( 'test', { status: { value: 'OK' }})
        let expected = { test: { status: { value: 'OK' }} }
        expect(sut.current()).toMatchObject(expected);
    });

    test('Should get property value', () => {
        sut.add ( 'test', { status: { value: 'OK' }})
        expect(sut.getValue('{{{test.status.value}}}')).toBe('OK');
    });

    test('Should not get property value', () => {
        sut.add ( 'test', { status: { value: 'OK' }})
        expect(sut.getValue('value')).toBe('value');
    });
});
