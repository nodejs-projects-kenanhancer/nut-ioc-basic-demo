module.exports.use = ({nutIocContainer}) => {

    nutIocContainer.useDependency({
        ServiceName: "authorBasicInfo",
        Namespace: undefined,
        Service: ({firstName: "Kenan", lastName: "Hancer"})
    });

    nutIocContainer.useDependency({
        ServiceName: "authorWithContacts",
        Namespace: undefined,
        Service: ({authorBasicInfo}) => ({...authorBasicInfo, city: "London", mail: "kenanhancer@gmail.com"})
    });
}