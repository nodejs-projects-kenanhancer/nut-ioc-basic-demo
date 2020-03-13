module.exports.ServiceName = ""; //fileName if empty,null or undefined

module.exports.Service = ({
    getFullName: ({ firstName, lastName }) => {
        return `${firstName} ${lastName}`;
    }
});
