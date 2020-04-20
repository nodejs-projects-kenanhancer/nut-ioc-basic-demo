const axios = require('axios');

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({}) =>
    ({
        executeAsync: async (options) => {

            const axiosRes = await axios(options);

            return axiosRes;
        }
    });
