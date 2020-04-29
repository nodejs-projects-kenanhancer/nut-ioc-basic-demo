module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({expressServer, appEnv, loopbackServer, swaggerDocumentValidator, swaggerDefinitions, swaggerDownstreamDefinitions}) => ({
    start: async (args) => {

        const swaggers = {...swaggerDefinitions, ...swaggerDownstreamDefinitions};

        Object.entries(appEnv).filter(([key, value]) => key.includes('ds.')).forEach(([key, value]) => {
            const [group, serviceName, fieldName] = key.split('.');

            swaggers[serviceName][fieldName] = value;
        });

        await swaggerDocumentValidator.validate({swaggerDefinitions: swaggers});

        await expressServer.start(args);
    }
});
