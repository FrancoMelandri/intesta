const sut = require('../../engine/postprocess'),
    context = require('../../engine/context')()

jest.mock('../../engine/assertions.js', () => ((context, _, __) => {
    expect(context.current()).toMatchObject({ 'keepAlive_1': {status: 'OK'}})
}))

describe('Testing requests post process', () => {

    test('Should create the right operation handler', () => {

        const operation = {
            name: 'keepAlive_1',
            operation: 'keepAlive',
            params: {
                param1: 'value1',
                param2: 'value2'
            }
        }
        sut(context, operation, {status: 'OK'})
    });

});
