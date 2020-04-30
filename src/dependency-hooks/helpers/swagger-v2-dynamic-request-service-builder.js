module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = async ({}) =>
    ({
        build: async ({swaggerDefinition}) => {

            const requests = {};

            const {schemes, host, basePath, paths, parameters, consumes, produces} = swaggerDefinition;

            for (let path in paths) {

                const methods = paths[path];

                for (const method in methods) {

                    const {parameters: methodParameters, operationId} = methods[method];

                    const parts = operationId && operationId.split('.');

                    if (!parts || (parts && parts.length < 2)) {
                        throw new Error(`SWAGGER ERROR: ${path} in Swagger definition doesn't have a proper operationId. Syntax should be like this "Greeting.sayHello"`)
                    }

                    let namespace;
                    let serviceId;
                    let actionFunc;

                    if (parts.length > 2) {
                        namespace = parts.slice(0, parts.length - 2).join('.');
                        serviceId = parts[parts.length - 2];
                        actionFunc = parts[parts.length - 1];
                    } else if (parts.length === 2) {
                        [serviceId, actionFunc] = parts;
                    }

                    const requestArgs = {
                        method: method.toUpperCase(),
                        schemes,
                        host,
                        basePath,
                        path,
                        payload: undefined,
                        headers: {}
                    };

                    const extraParameters = {};
                    for (const methodParameter of methodParameters) {

                        let prm;
                        let methodParameterObj;

                        if (methodParameter.hasOwnProperty('$ref')) {
                            prm = Object.values(methodParameter)[0];

                            const splitParam = prm.split('/');

                            const methodParameterName = splitParam && splitParam[splitParam.length - 1];

                            prm = methodParameterName;

                            methodParameterObj = parameters[prm];
                        } else {
                            prm = methodParameter.name;

                            methodParameterObj = methodParameter;
                        }

                        extraParameters[prm] = methodParameterObj;
                    }

                    if (!requests.hasOwnProperty(serviceId)) {
                        requests[serviceId] = {};
                    }

                    const parameterNames = Object.entries(extraParameters);
                    const requiredParameters = parameterNames.filter(([key, value]) => value.required).map(([key, value]) => key);

                    if (!requests[serviceId].Service) {
                        requests[serviceId].Service = {};
                    }

                    requests[serviceId].Namespace = namespace;
                    requests[serviceId].ServiceName = serviceId;
                    requests[serviceId].Service[actionFunc] = ({requestHandler}) =>
                        async function () {

                            if (parameterNames.length > 0) {
                                let argumentException = arguments.length === 0;
                                let argumentNames;

                                if (!argumentException) {
                                    argumentNames = Object.keys(arguments[0]);

                                    argumentException = !requiredParameters.some(item => argumentNames.includes(item));
                                }

                                if (argumentException) {
                                    throw new Error(`SWAGGER ERROR: Swagger request function needs below parameters.\n${requiredParameters}. Arguments that are taken are ${argumentNames}`)
                                }
                            }

                            for (const prm in extraParameters) {
                                const {name, in: parameterLocation, required, type, maxLength} = extraParameters[prm];
                                const argValue = arguments[0][prm];

                                if (!argValue) {
                                    continue;
                                }

                                if (parameterLocation === 'header') {
                                    // GET /ping HTTP/1.1
                                    // Host: example.com
                                    // X-Request-ID: 77e1c83b-7bb0-437b-bc50-a7a58e5660ac

                                    // such as X-MyHeader: Value

                                    // paths:
                                    //     /ping:
                                    // get:
                                    //     summary: Checks if the server is alive.
                                    //     parameters:
                                    // - in: header
                                    // name: X-Request-ID
                                    // type: string
                                    // required: true

                                    requestArgs.headers[name] = argValue;
                                } else if (parameterLocation === 'path') {
                                    // GET /users/{id}
                                    // GET /cars/{carId}/drivers/{driverId}
                                    // such as /users/{id}

                                    // paths:
                                    //     /users/{id}:
                                    // get:
                                    //     parameters:
                                    //         - in: path
                                    // name: id   # Note the name is the same as in the path
                                    // required: true
                                    // type: integer
                                    // minimum: 1
                                    // description: The user ID.
                                    //     responses:
                                    // 200:
                                    // description: OK

                                    requestArgs.path = path.replace(`{${name}}`, argValue);
                                } else if (parameterLocation === 'query') {
                                    // GET /pets/findByStatus?status=available
                                    // GET /notes?offset=100&limit=50
                                    // such as /users?role=admin

                                    // parameters:
                                    //     - in: query
                                    // name: offset
                                    // type: integer
                                    // description: The number of items to skip before starting to collect the result set.
                                    // - in: query
                                    // name: limit
                                    // type: integer
                                    // description: The numbers of items to return.

                                } else if (parameterLocation === 'formData') {
                                    // This form POSTs data to the form’s endpoint:
                                    // POST /survey HTTP/1.1
                                    // Host: example.com
                                    // Content-Type: application/x-www-form-urlencoded
                                    // Content-Length: 29
                                    // name=Amy+Smith&fav_number=321

                                    // paths:
                                    //     /survey:
                                    // post:
                                    //     summary: A sample survey.
                                    //     consumes:
                                    // - application/x-www-form-urlencoded
                                    // parameters:
                                    //     - in: formData
                                    // name: name
                                    // type: string
                                    // description: A person's name.
                                    // - in: formData
                                    // name: fav_number
                                    // type: number
                                    // description: A person's favorite number.
                                    // responses:
                                    //     200:
                                    // description: OK
                                } else if (parameterLocation === 'body') {

                                }
                            }

                            const scheme = schemes && schemes.length > 0 ? schemes[0] : 'http';

                            requestArgs.url = `${scheme}://${host}${basePath}${requestArgs.path}`;

                            const response = await requestHandler.executeAsync(requestArgs);

                            return response;
                        };
                }
            }

            for (const serviceId in requests) {
                const funcList = requests[serviceId].Service;

                requests[serviceId].Service = ({requestHandler}) => {

                    for (const fn in funcList) {
                        funcList[fn] = funcList[fn]({requestHandler});
                    }

                    return funcList;
                }
            }

            return requests;
        }
    });
