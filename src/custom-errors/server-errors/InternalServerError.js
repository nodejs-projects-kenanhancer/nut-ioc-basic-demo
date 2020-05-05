module.exports.Service = ({ BaseError }) =>
    function ({ code, message }) {

        Object.assign(this, new BaseError({ code, message, statusCode: 500 }));

        this.name = "InternalServerError";
    };
