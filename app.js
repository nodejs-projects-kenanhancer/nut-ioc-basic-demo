require('dotenv').config();

const appIocContainer = require('./app-ioc-container-provider').get({ name: process.env.IOC_CONTAINER_NAME });

const mainAsync = async () => {

    const { httpServer } = await appIocContainer.build({});

    await httpServer.start({});
};

mainAsync();
