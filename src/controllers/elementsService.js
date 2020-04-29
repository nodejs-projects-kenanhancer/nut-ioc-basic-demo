module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        getForms: async ({ appid }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/formbuilder-api/v1",
                path: "/forms",
                url: "http://localhost:8080/formbuilder-api/v1/forms",
                payload: undefined,
                headers: {
                    "appid": appid || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        getElements: async ({ appid, pageid }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/formbuilder-api/v1",
                path: "/elements",
                url: "http://localhost:8080/formbuilder-api/v1/elements",
                payload: undefined,
                headers: {
                    "appid": appid || '',
					"pageid": pageid || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        saveElements: async ({ elements }) => {
            const requestArgs = {
                method: "POST",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/formbuilder-api/v1",
                path: "/elements",
                url: "http://localhost:8080/formbuilder-api/v1/elements",
                payload: undefined,
                headers: {
                    "elements": elements || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    };

};