module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = async ({ expressServer, swaggerDefinitions, defaultRequestHeaderPrettifierMiddleware, swaggerRequestHeaderPrettifierMiddleware, dependencyProvider }) => {

    const { app, express } = expressServer.configProvider;

    const createSwaggerServiceRoute = async ({ swaggerDefinition }) => {
        const router = express.Router();

        router.all('*', swaggerRequestHeaderPrettifierMiddleware, defaultRequestHeaderPrettifierMiddleware);

        const { basePath, paths } = swaggerDefinition;

        for (const path in paths) {

            const methods = paths[path];

            for (const method in methods) {

                const { operationId } = methods[method];

                const actionFunc = await dependencyProvider(operationId);

                if (!actionFunc) {
                    console.error(`ERROR: Express Swagger Middleware couldn't find ${servicoperationIdeId} dependency in Dependency Injection Framework.`);
                    continue;
                    // throw new Error(`${serviceId} dependency couldn't be find in Dependency Injection Framework.`);
                }

                const expressPath = path.replace('}', '').replace('{', ':');

                router[method](expressPath, async (req, res, next) => {

                    req.swaggerDefinition = swaggerDefinition;

                    await actionFunc(req.args)
                        .then(response => res.status(200).send(response))
                        .catch(error => {
                            next(error);
                        });
                });

            }

        }

        app.use(basePath, router);
    };

    for (const swaggerDefinition in swaggerDefinitions) {
        await createSwaggerServiceRoute({ swaggerDefinition: swaggerDefinitions[swaggerDefinition] });
    }

};
