module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({expressServer, loopbackServer, swaggerDocumentValidator, swaggerDefinitions, swaggerDownstreamDefinitions}) => ({
    start: async (args) => {

        const swaggers = {...swaggerDefinitions, ...swaggerDownstreamDefinitions};

        await swaggerDocumentValidator.validate({swaggerDefinitions: swaggers});

        await expressServer.start(args);
    }
});
