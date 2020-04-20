const { capitalize } = require('nut-ioc/helpers/string-helper');

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ swaggerV2RequestHeaderValidator }) =>
    ({ swaggerDefinitions, url, baseUrl, headers, method, }) => {

        const swaggerDefinition = Object.values(swaggerDefinitions).find(def => def.basePath === baseUrl);

        // const {schemes, host, basePath, serviceId, paths, parameters, consumes, produces} = swaggerDefinition;
        const { paths, parameters } = swaggerDefinition;

        const [path, pathValue] = Object.entries(paths).find(([key, value]) => key === url);

        const [pathMethod, pathMethodValue] = Object.entries(pathValue).find(([key, value]) => key.toLowerCase() === method.toLowerCase());

        const { parameters: pathMethodParameters } = pathMethodValue;

        const args = {};

        pathMethodParameters.forEach(parameter => {

            let methodParameter;
            let methodParameterObj;

            if (parameter.hasOwnProperty('$ref')) {
                methodParameter = Object.values(parameter)[0];

                const splitParam = methodParameter.split('/');

                const methodParameterName = splitParam && splitParam[splitParam.length - 1];

                methodParameter = methodParameterName;

                methodParameterObj = parameters[methodParameter];
            } else {
                methodParameter = parameter.name;

                methodParameterObj = parameters && parameters[methodParameter] || parameter;
            }

            if(!methodParameterObj){
                
            }
            
            swaggerV2RequestHeaderValidator.validate({ headers, parameter: methodParameterObj });

            const { name, lowerCaseName = name.toLowerCase() } = methodParameterObj;

            args[capitalize(methodParameter)] = headers[lowerCaseName];
        });

        return args;
    };