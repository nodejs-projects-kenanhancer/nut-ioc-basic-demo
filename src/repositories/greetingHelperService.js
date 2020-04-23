module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        getFullName: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost",
                basePath: "/greeting-helper-api/v1",
                path: "/getFullName",
                url: "http://localhost/greeting-helper-api/v1/getFullName",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    };

};