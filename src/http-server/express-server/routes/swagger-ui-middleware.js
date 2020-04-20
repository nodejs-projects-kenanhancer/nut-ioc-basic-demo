const swaggerUiMiddleware = require('swagger-ui-express');

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = async ({ expressServer, AppEnv, swaggerDefinitions, swaggerDownstreamDefinitions }) => {

    const { app, express } = expressServer.configProvider;

    const { port } = AppEnv;
    AppEnv.ApiDocs = [];

    const options = {
        explorer: true
    };

    const router = express.Router();

    const swaggers = { ...swaggerDefinitions, ...swaggerDownstreamDefinitions };

    for (const swaggerDefinitionName in swaggers) {
        const swaggerDefinition = swaggers[swaggerDefinitionName]
        const { basePath } = swaggerDefinition;

        router.use(basePath, swaggerUiMiddleware.serve);

        router.get(basePath, function (req, res) {
            const html = swaggerUiMiddleware.generateHTML(swaggerDefinition, options);

            res.send(html);
        });

        AppEnv.ApiDocs.push(`http://localhost:${port}/api-docs/${basePath}`);

    }

    app.use("/api-docs", router);

};
