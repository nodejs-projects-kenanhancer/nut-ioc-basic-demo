module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) =>
    ({
        sayHello: async ({ language, firstName, lastName }) => {
            return {};
        },
        sayGoodbye: async ({ language, firstName, lastName }) => {
            return {};
        }
    });