module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ swaggerV2RequestHeaderValidator, capitalize, clientErrors: { SwaggerError } }) =>
    ({ swaggerDefinitions, url, baseUrl, headers, method, body }) => {

        const methodLowerCase = method.toLowerCase();

        const queryStringArray = url.split('?');

        const pathUrl = queryStringArray[0];

        const splittedPathUrl = pathUrl.split('/').slice(1);



        const swaggerDefinition = swaggerDefinitions && Object.values(swaggerDefinitions).find(def => def.basePath === baseUrl) || {};

        if (!swaggerDefinition) {
            throw new SwaggerError({ message: `Bad request:: Swagger ${baseUrl} base url not found in Swagger definiton.` });
        }

        // const {schemes, host, basePath, serviceId, swagger_paths, parameters, consumes, produces} = swaggerDefinition;
        const { paths: swagger_paths, parameters: swagger_parameters } = swaggerDefinition;

        const [swagger_path, swagger_pathMethods] = Object.entries(swagger_paths).find(([key]) => key === pathUrl || key.split('/').slice(1).every((item, index) => item.includes('{') || splittedPathUrl[index] === item)) || [];

        if (!swagger_path) {
            throw new SwaggerError({ message: `Bad request:: Swagger ${pathUrl} path not found in Swagger definition.` });
        }


        let queryParams, pathParams;

        if (queryStringArray.length === 2) {
            queryParams = new URLSearchParams(queryStringArray[1]);

            queryParams = Array.from(queryParams.entries()).reduce((acc, [key, value]) => ({ ...acc, [key.toLowerCase()]: value }), {});
        }

        if (swagger_path.includes('{')) {
            pathParams = swagger_path.split('/').reduce((acc, cur, index) => {

                if (!cur.includes('{')) {
                    return acc;
                }

                return { ...acc, [cur.replace(/[{}]/g, '').toLowerCase()]: splittedPathUrl[index - 1] };
            }, {});
        }

        const [, swagger_pathMethod] = Object.entries(swagger_pathMethods).find(([key, value]) => key.toLowerCase() === methodLowerCase) || [];

        if (!swagger_pathMethod) {
            throw new SwaggerError({ message: `Bad request:: Swagger ${method} method not found in ${swagger_path} path in Swagger definition.` });
        }

        const args = {};

        swagger_pathMethod.parameters.forEach(swagger_pathMethodParameter => {

            let pathMethodParameterName;
            let methodParameterObj;

            if (swagger_pathMethodParameter.hasOwnProperty('$ref')) {
                pathMethodParameterName = Object.values(swagger_pathMethodParameter)[0];

                const splitParam = pathMethodParameterName.split('/');

                const methodParameterName = splitParam && splitParam[splitParam.length - 1];

                pathMethodParameterName = methodParameterName;

                methodParameterObj = swagger_parameters[pathMethodParameterName];
            } else {
                pathMethodParameterName = swagger_pathMethodParameter.name;

                methodParameterObj = swagger_pathMethodParameter;
            }

            const paramValue = swaggerV2RequestHeaderValidator.validate({ headers, queryParams, pathParams, body, swagger_pathMethodParameter: methodParameterObj });

            args[capitalize(pathMethodParameterName)] = paramValue;
        });

        return args;
    };