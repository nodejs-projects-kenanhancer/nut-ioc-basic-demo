module.exports.ServiceName = ""; //fileName if empty,null or undefined

module.exports.Service = ({ helper }) =>
({
    sayHello: ({ firstName, lastName }) => {
        const fullName = helper.getFullName({ firstName, lastName });

        return `Hello ${fullName}`;
    },
    sayGoodbye: ({ firstName, lastName }) => {
        const fullName = helper.getFullName({ firstName, lastName });

        return `Goodbye, ${fullName}`;
    }
});
