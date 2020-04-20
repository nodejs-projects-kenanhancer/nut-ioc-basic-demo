module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({axiosRequestHandler}) =>
    ({
        executeAsync: async (options) => {

            const response = await axiosRequestHandler.executeAsync(options);

            return response.data;
        }
    });
