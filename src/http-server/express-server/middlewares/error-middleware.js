module.exports.ServiceName = ''; //fileName if empty,null or undefined
module.exports.Service = ({ clientErrors, customErrors: { serverErrors } }) => async (error, req, res, next) => {

    let message = '';

    if (error instanceof serverErrors.NotImplementedError) {
        message = `${error.name}: ${error.message}`;
    } else if (error instanceof clientErrors.SwaggerError) {
        message = `${error.name}: ${error.message}`;
    } else if (error instanceof serverErrors.DownstreamError) {
        message = `${error.name}: ${error.message}`;
    }

    res.statusCode = error.statusCode || 500;
    res.send(message || 'ERROR');

};