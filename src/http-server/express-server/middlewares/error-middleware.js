module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) =>
    async (error, req, res, next) => {

        // downstream error
        if (error.message && error.message.error) {
            error = error.message.error;
        }

        if (typeof error['message'] !== 'string') {
            error['message'] = '';
        }

        const responseBody = "ERROR";
        res.statusCode = error.response.status;

        if ([400, 500].includes(res.statusCode)) {
            res.send(responseBody);
        } else {
            res.send();
        }
    };
