module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) =>
    ({ name, value, type, minLength, maxLength, enumValue, regex }) => {
        if (value && value !== '' && type === 'number' || type === 'integer') {

            console.log('SWAGGER WARNING: It is not implemented yet.');
        }
    };