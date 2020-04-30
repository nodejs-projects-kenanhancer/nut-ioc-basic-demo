module.exports = {
    IsHook: true,
    ServiceName: "",
    Namespace: undefined,
    Service: ({swaggerDefinitions, swaggerDownstreamDefinitions, appEnv}) => {

        const swaggers = {...swaggerDefinitions, ...swaggerDownstreamDefinitions};

        Object.entries(appEnv).filter(([key, value]) => key.includes('ds.') || key.includes('cs.')).forEach(([key, value]) => {
            const [group, serviceName, fieldName] = key.split('.');

            swaggers[serviceName][fieldName] = value;
        });
    }
}
