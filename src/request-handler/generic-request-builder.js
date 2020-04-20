module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) =>
    ({ requestArgs, mockServiceRequest = false }) => {

        const { method, url, basePath, path, payload, headers } = requestArgs;

        const request = {
            method,
            [(mockServiceRequest ? 'path' : 'url')]: mockServiceRequest ? basePath + path : url,
            headers
        };

        if (mockServiceRequest) {
            if (payload) {
                request.body = {
                    type: 'JSON',
                    // json: JSON.stringify(payload),
                    contentType: 'application/json'
                }
            }
        } else {
            request.data = payload
        }

        return request;
    };
