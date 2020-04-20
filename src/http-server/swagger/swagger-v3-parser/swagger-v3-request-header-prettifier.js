module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({swaggerV2RequestHeaderValidator}) =>
    ({swaggerDefinitions, url, baseUrl, headers, method,}) => {

        const swaggerDefinition = Object.values(swaggerDefinitions).find(def => def.basePath === baseUrl);

        // const {schemes, host, basePath, serviceId, paths, parameters, consumes, produces} = swaggerDefinition;
        const {paths, parameters} = swaggerDefinition;

        const [path, pathValue] = Object.entries(paths).find(([key, value]) => key === url);

        const [pathMethod, pathMethodValue] = Object.entries(pathValue).find(([key, value]) => key.toLowerCase() === method.toLowerCase());

        const {parameters: pathMethodParameters} = pathMethodValue;

        const args = {};

        pathMethodParameters.forEach(item => {

            const methodParameter = Object.values(item)[0];

            const splitParam = methodParameter.split('/');

            const methodParameterName = splitParam && splitParam[splitParam.length - 1];

            const methodParameterObj = parameters[methodParameterName];

            swaggerV2RequestHeaderValidator.validate({headers, parameter: methodParameterObj});

            const {name} = methodParameterObj;

            args[methodParameterName] = headers[name];
        });

        return args;
    };