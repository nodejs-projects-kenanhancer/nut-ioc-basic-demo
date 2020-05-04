module.exports.ServiceName = ''; //fileName if empty,null or undefined
module.exports.Service = ({ }) => async (error, req, res, next) => {
    // downstream error
    if (error.message && error.message.error) {
        error = error.message.error;
    }

    if (typeof error['message'] !== 'string') {
        error['message'] = '';
    }

    const responseBody = error.message || 'ERROR';
    res.statusCode = error.statusCode || res.statusCode;

    if ([400, 401, 403, 404, 405, 406, 412, 415, 500, 501].includes(res.statusCode)) {
        res.send(responseBody);
    } else {
        res.send();
    }
};