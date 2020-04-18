module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ firstName,lastName }) => {
            return {};
        },
        sayGoodbye: async ({ firstName,lastName }) => {
            return {};
        }
    };

};