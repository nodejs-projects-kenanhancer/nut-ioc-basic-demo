module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) =>
    ({
        getFullName: async ({ firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:1080",
                basePath: "/greeting-helper-api/v1",
                path: "/getFullName",
                url: "http://localhost:1080/greeting-helper-api/v1/getFullName",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    });