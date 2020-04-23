module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-turkish-api/v1",
                path: "/sayHello",
                url: "http://localhost:8080/greeting-turkish-api/v1/sayHello",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        sayGoodbye: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-turkish-api/v1",
                path: "/sayGoodbye",
                url: "http://localhost:8080/greeting-turkish-api/v1/sayGoodbye",
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