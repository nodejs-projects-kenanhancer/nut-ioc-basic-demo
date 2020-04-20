module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) => ({
    validate: ({ parameter, headers }) => {

        const { name, lowerCaseName = name && name.toLowerCase(), in: parameterLocation, required, type, minLength, maxLength, enum: enumValue, pattern: regex } = parameter || {};

        if (!name || name === "") {
            throw new Error(`Header name value cannot be empty, null or undefined.`);
        }

        const isHeaderInRequest = [lowerCaseName] in headers;

        if (required && !isHeaderInRequest) {
            throw new Error(`${name} header is required`);
        }

        if (isHeaderInRequest) {
            const headerValue = headers[lowerCaseName];

            if (type === 'string') {

                if (minLength && headerValue.length < minLength) {
                    throw new Error(`${name} header value's minLength can be min ${headerValue.length}`);
                }

                if (maxLength && headerValue.length > maxLength) {
                    throw new Error(`${name} header value's maxLength can be max ${headerValue.length}`);
                }

                if (enumValue && !enumValue.includes(headerValue)) {
                    throw new Error(`${name} header value can be any of ${enumValue}`);
                }

                if (regex) {
                    const found = headerValue.match(regex);

                    if (!found) {
                        throw new Error(`${name} header value's pattern doesn't match ${regex}`);
                    }
                }

            }
        }

    }
});