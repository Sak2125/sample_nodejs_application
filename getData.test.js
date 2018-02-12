'use strict';

const test = require('tap').test,
    proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    createTestContext = (condition) => {
        const
            fs = {
                readFileSync: () => {
                    return condition ? JSON.stringify([{
                        "id": 1,
                        "title": "test-1",
                        "content": "This is test-1"
                    },
                        {
                            "id": 2,
                            "title": "test-2",
                            "content": "This is test-2"
                        }]) : [];
                }
            },
            stubs = {

                'fs': fs
            }

        return {
            testModule: proxyquire('./getData.js', stubs)
        }
    }

test('should return valid response for a successful request', t=> {

    const getDataTestModule = createTestContext(true).testModule,
        response = {
            status: sinon.spy(function () {
                return this;
            }),
            send: sinon.spy()
        },
        expectedResponse = [{
            "id": 2,
            "title": "test-2",
            "content": "This is test-2"
        }];

    const data = getDataTestModule({params: {id: 2}}, response);

    t.assert(response.status.calledWith(200), 'should have been called with 200');
    t.deepEqual(expectedResponse, response.send.args[0][0], 'should be equal')
    t.end();
})

test('should return an error response for a failed request', t=> {

    const getDataTestModule = createTestContext(true).testModule,
        response = {
            status: sinon.spy(function () {
                return this;
            }),
            send: sinon.spy()
        },
        expectedResponse = "No resource found with the id - 3";

    const data = getDataTestModule({params: {id: 3}}, response);

    t.assert(response.status.calledWith(400), 'should have been called with 400');
    t.equal(response.send.args[0][0].message,expectedResponse , 'should be equal')
    t.end();
})