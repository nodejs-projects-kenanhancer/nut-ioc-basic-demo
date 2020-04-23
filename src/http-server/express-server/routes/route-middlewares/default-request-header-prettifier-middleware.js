const { capitalize } = require('nut-ioc/helpers/string-helper');

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) =>
    async (req, res, next) => {

        const { headers } = req;

        const newHeaders = {};

        for (const header in headers) {
            const capitalizedHeader = capitalize(header);
            newHeaders[capitalizedHeader] = headers[header];
        }

        req.args = { ...req.args, ...newHeaders };

        await next();
    };
