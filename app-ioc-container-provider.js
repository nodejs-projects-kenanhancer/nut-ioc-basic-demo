const appIocContainerConfigurations = require('./app-ioc-container-configurations');

module.exports.get = ({name = 'app-ioc-container-configuration-basic'}) => appIocContainerConfigurations[name];
