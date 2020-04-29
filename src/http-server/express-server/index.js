const express = require('express');

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = async ({ errorMiddleware, appEnv, dependencyContainer: { useDependency } }) => {

    const app = express();

    const { port = 8080 } = appEnv;

    app.use(express.json()); // using bodyParser to parse JSON bodies into JS objects

    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    return {
        configProvider: { app, express, port },
        start: async ({ }) => {

            // app.use(errorMiddleware);

            app.use(async (error, req, res, next) => await errorMiddleware(error, req, res, next));

            app.listen(port, () => console.log(`Example app listening on port ${port}!`));

            console.log(`Swagger Document links:${appEnv.ApiDocs.reduce((acc, cur) => `${acc}\n${cur}`, "")}`);

        }
    };
};
