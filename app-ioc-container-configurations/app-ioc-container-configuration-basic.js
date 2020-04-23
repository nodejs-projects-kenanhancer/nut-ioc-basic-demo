const nutIoc = require('nut-ioc');
const commonIocContainerConfig = require('./app-ioc-container-configuration-common');

module.exports.build = ({ dependencyContainerProvider }) => {

    const nutIocContainer = nutIoc();

    commonIocContainerConfig.use({ nutIocContainer });

    nutIocContainer.use({ dependencyPath: './src' });

    dependencyContainerProvider && dependencyContainerProvider(nutIocContainer);

    return nutIocContainer.build();
};
