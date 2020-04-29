const { mockServerClient } = require('mockserver-client');

const hostname = process.env.MOCK_SERVER_HOST || 'localhost';
const port = process.env.MOCK_SERVER_PORT || 1080;

const target = `${hostname}:${port}`;
const client = mockServerClient(hostname, port);

client.setDefaultHeaders({});

const createExpectation = async (request, response) => {
    const httpRequest = {
        method: request.method,
        path: request.path,
        body: request.body
    };

    console.log(`Stub setup: ${httpRequest.method} ${target}${httpRequest.path}`);

    if (request.headers) {
        httpRequest.headers = Object.keys(request.headers).map((name) => ({
            name,
            values: [request.headers[name]]
        }));
    }

    if (request.query) {
        httpRequest.queryStringParameters = Object.keys(request.query).map((name) => ({
            name,
            values: [request.query[name]]
        }));
    }

    const httpResponse = {
        statusCode: parseInt(response.statusCode),
        body: typeof response.body === 'object' ? JSON.stringify(response.body) : response.body
    };

    if (response.headers) {
        httpResponse.headers = Object.keys(response.headers).map((name) => ({
            name,
            values: [response.headers[name]]
        }));
    }

    return await client.mockAnyResponse({ httpRequest, httpResponse })
        .then(() => {
            console.log(`Stub created: ${httpRequest.method} ${target}${httpRequest.path}`);
        })
        .catch((err) => {
            console.error('MOCK ERROR: Error while creating stubs: ', err);
        });
};

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => ({
    resetMockServer: async () => (
        await client.reset()
            .then(() => {
                console.log(`Mock server reset: [${target}]`);
            })
            .catch(err => {
                console.error(`MOCK ERROR: Error resetting mock server: [${target}]`, err);
                process.exit(1);
            })
    ),
    createExpectation,
    setupExpectation: async ({ stub, statusCode, requestArgs }) => {

        const request = await stub.requestBuilder(requestArgs, true);

        let response = await stub.responseBuilder({ statusCode });

        // const error = errorScenarios[statusCode];
        // response = error || response;

        return await createExpectation(request, response);

    },
    callService: async (args, context) => {

        return await requestHandler.executeAsync(args)
            .then((response) => {
                context.responseHeaders = response.headers;
                context.responseBody = response.data;
                context.responseStatusCode = response.status;
            })
            .catch((err) => {
                context.responseBody = err.message;
                context.responseStatusCode = err.response.status;
            });
    }

});