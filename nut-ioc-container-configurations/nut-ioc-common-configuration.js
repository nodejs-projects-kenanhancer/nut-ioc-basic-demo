require('dotenv').config();

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

    nutIocContainer.useDependency({
        ServiceName: "appEnv",
        Namespace: undefined,
        Service: {...process.env}
    });

    nutIocContainer.useDependency({
        IsHook: true,
        ServiceName: "swaggerDownstreamDefinitionsUpdateHook",
        Namespace: undefined,
        Service: ({swaggerDefinitions, swaggerDownstreamDefinitions, appEnv}) => {

            const swaggers = {...swaggerDefinitions, ...swaggerDownstreamDefinitions};

            Object.entries(appEnv).filter(([key, value]) => key.includes('ds.') || key.includes('cs.')).forEach(([key, value]) => {
                const [group, serviceName, fieldName] = key.split('.');

                swaggers[serviceName][fieldName] = value;
            });
        }
    });
}