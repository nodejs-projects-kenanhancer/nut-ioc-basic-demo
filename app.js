require('dotenv').config();

const {getNutIocContainer} = require('./nut-ioc-container-configurations');

const nutIocContainer = getNutIocContainer({name: process.env.NUT_IOC_CONTAINER_NAME});

const mainAsync = async () => {

    const { httpServer } = await nutIocContainer.build({});

    await httpServer.start({});
};

mainAsync();
