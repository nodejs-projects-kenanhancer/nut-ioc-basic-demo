module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) => ({

    debug: (message, args) => {

        console.log(message);
    },

    error: (message, args) => {

        console.log(message);
    },

    info: (message, args) => {

        console.log(message);
    }
});
