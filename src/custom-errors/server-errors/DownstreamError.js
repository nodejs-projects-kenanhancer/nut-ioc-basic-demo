module.exports.Service = ({ serverErrors: { InternalServerError } }) =>
    function ({ code, message }) {

        Object.assign(this, new InternalServerError({ code, message }));

        this.name = "DownstreamError";
    };
