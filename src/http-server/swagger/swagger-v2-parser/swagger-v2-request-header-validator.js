module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ swaggerV2FieldValidators }) => ({
    validate: ({ headers, queryParams, pathParams, swagger_pathMethodParameter }) => {

        const { name, lowerCaseName = name && name.toLowerCase(), in: parameterLocation, required, type, minLength, maxLength, enum: enumValue, pattern: regex } = swagger_pathMethodParameter;

        if (!name || name === "") {
            throw new Error(`Header name value cannot be empty, null or undefined.`);
        }

        let value;

        if (parameterLocation === 'query') {

            if (required && ![lowerCaseName] in queryParams) {
                throw new Error(`${lowerCaseName} query string field should be in url`);
            }

            value = queryParams[lowerCaseName];
        }
        else if (parameterLocation === 'header') {

            if (required && ![lowerCaseName] in headers) {
                throw new Error(`${lowerCaseName} header is required`);
            }

            value = headers[lowerCaseName];
        }
        else if (parameterLocation === 'path') {

            if (required && ![lowerCaseName] in pathParams) {
                throw new Error(`${lowerCaseName} path field should be in url`);
            }

            value = pathParams[lowerCaseName];
        }

        Object.values(swaggerV2FieldValidators).forEach(fieldValidator => fieldValidator({ value, type, minLength, maxLength, enumValue, regex }));

        return value;
    }
});