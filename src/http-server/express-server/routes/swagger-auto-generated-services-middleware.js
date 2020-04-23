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

                const parts = operationId && operationId.split('.');

                if (!parts || (parts && parts.length < 2)) {
                    throw new Error(`${path} in Swagger definition doesn't have a proper operationId. Syntax should be like this "Greeting.sayHello"`)
                }

                const serviceId = parts[0];
                const serviceModule = await dependencyProvider(serviceId);

                if (!serviceModule) {
                    console.error(`ERROR: Express Swagger Middleware couldn't find ${serviceId} dependency in Dependency Injection Framework.`);
                    continue;
                    // throw new Error(`${serviceId} dependency couldn't be find in Dependency Injection Framework.`);
                }

                const actionFunc = serviceModule[parts[1]];

                if (!actionFunc) {
                    console.error(`ERROR: Express Swagger Middleware couldn't find ${parts[1]} function in ${serviceId} dependency.`);
                    continue;
                    // throw new Error(`${parts[1]} function couldn't be find in ${serviceId} dependency.`);
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
