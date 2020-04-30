module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) =>
    ({
        getForms: async ({ appid }) => {
            return {};
        },
        getElements: async ({ appid, pageid }) => {
            return {};
        },
        saveElements: async ({ elements }) => {
            return {};
        }
    });