module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) => ({
    validate: ({ parameter, headers }) => {

        const { name, in: parameterLocation, required, type, minLength, maxLength, enum: enumValue, pattern: regex } = parameter || {};

        const isHeaderInRequest = [name] in headers;

        if (!parameter || required) {
            if (!parameter || !isHeaderInRequest) {
                throw new Error(`SWAGGER ERROR: ${name} header is required`);
            }
        }

        if (isHeaderInRequest) {
            const headerValue = headers[name];

            if (type === 'string') {

                if (minLength && headerValue.length < minLength) {
                    throw new Error(`SWAGGER ERROR: ${name} header value's minLength can be min ${headerValue.length}`);
                }

                if (maxLength && headerValue.length > maxLength) {
                    throw new Error(`SWAGGER ERROR: ${name} header value's maxLength can be max ${headerValue.length}`);
                }

                if (enumValue && !enumValue.includes(headerValue)) {
                    throw new Error(`SWAGGER ERROR: ${name} header value can be any of ${enumValue}`);
                }

                if (regex) {
                    const found = headerValue.match(regex);

                    if (!found) {
                        throw new Error(`SWAGGER ERROR: ${name} header value's pattern doesn't match ${regex}`);
                    }
                }

            }
        }

    }
});