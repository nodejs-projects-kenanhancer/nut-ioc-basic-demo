module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) =>
    ({ value, type, minLength, maxLength, enumValue, regex }) => {
        if (value && value !== '' && type === 'string') {

            if (minLength && value.length < minLength) {
                throw new Error(`${name} header value's minLength can be min ${value.length}`);
            }

            if (maxLength && value.length > maxLength) {
                throw new Error(`${name} header value's maxLength can be max ${value.length}`);
            }

            if (enumValue && !enumValue.includes(value)) {
                throw new Error(`${name} header value can be any of ${enumValue}`);
            }

            if (regex) {
                const found = value.match(regex);

                if (!found) {
                    throw new Error(`${name} header value's pattern doesn't match ${regex}`);
                }
            }
        }
    };