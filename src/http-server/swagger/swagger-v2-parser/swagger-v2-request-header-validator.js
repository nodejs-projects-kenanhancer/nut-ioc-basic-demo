module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ swaggerV2FieldValidators }) => ({
    validate: ({ headers, queryParams, pathParams, body, swagger_pathMethodParameter }) => {

        const { name, lowerCaseName = name && name.toLowerCase(), in: parameterLocation, required, type, minLength, maxLength, enum: enumValue, pattern: regex, schema } = swagger_pathMethodParameter;

        if (!name || name === "") {
            throw new Error(`SWAGGER ERROR: Header name value cannot be empty, null or undefined.`);
        }

        let value;

        if (parameterLocation === 'query') {

            if (required && ![lowerCaseName] in queryParams) {
                throw new Error(`SWAGGER ERROR: ${lowerCaseName} query string field should be in url`);
            }

            value = queryParams[lowerCaseName];
        }
        else if (parameterLocation === 'header') {

            if (required && ![lowerCaseName] in headers) {
                throw new Error(`SWAGGER ERROR: ${lowerCaseName} header is required`);
            }

            value = headers[lowerCaseName];
        }
        else if (parameterLocation === 'path') {

            if (required && ![lowerCaseName] in pathParams) {
                throw new Error(`SWAGGER ERROR: ${lowerCaseName} path field should be in url`);
            }

            value = pathParams[lowerCaseName];
        }
        else if (parameterLocation === 'body') {

            if (required && !body) {
                throw new Error(`SWAGGER ERROR: body is required`);
            }

            value = body;
        }

        Object.values(swaggerV2FieldValidators).forEach(fieldValidator => fieldValidator({ name, value, type, minLength, maxLength, enumValue, regex }));

        return value;
    }
});