const sut = require('../index')

jest.mock('../engine/apiLoader', () => (d) => ({ }));
jest.mock('../engine/runner', () => () => ({ }));
jest.mock('../engine/sessionLoader', () => (s, d) => ({ }));

describe('Testing API loader', () => {

    test('Should handle api, session and runner', () => {
        // jest.requireMock('../engine/apiLoader', _ => _({
        //     console.log("api")
        //    // return (descriptorFile ) => console.log(descriptorFile)
        // }))

        // jest.mock('../engine/runner', () => {
        //     console.log("runner: ")
        // })

        // jest.mock('../engine/sessionLoader', () => {
        //     console.log("session: ")
        // })
        
        sut('','');
    });
});
