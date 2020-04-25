const nutIoc = require('nut-ioc');
const nutIocCommonConfiguration = require('./nut-ioc-common-configuration');

module.exports.build = ({ nutIocConfigurationProvider }) => {

    const nutIocContainer = nutIoc();

    nutIocCommonConfiguration.use({ nutIocContainer });

    nutIocContainer.use({ dependencyPath: './src' });

    nutIocConfigurationProvider && nutIocConfigurationProvider({ nutIocContainer });

    return nutIocContainer.build();
};
