const nutIoc = require('nut-ioc');
const nutIocCommonConfiguration = require('./nut-ioc-common-configuration');

module.exports.build = ({ nutIocConfigurationProvider }) => {

    const nutIocContainer = nutIoc();

    nutIocCommonConfiguration.use({ nutIocContainer });

    nutIocContainer.use({ dependencyPath: './src/interceptors' });

    nutIocContainer.use({ dependencyPath: './src/constants' });

    nutIocContainer.use({ dependencyPath: './src/log-handler' });

    nutIocContainer.use({ dependencyPath: './src/request-handler' });

    nutIocContainer.use({ dependencyPath: './src/swagger-definitions' });

    nutIocContainer.use({ dependencyPath: './src/swagger-downstream-definitions' });

    nutIocContainer.use({ dependencyPath: './src/http-server' });

    nutIocContainer.use({
        dependencyPath: './src/controllers',
        interceptor: ({ interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor } }) => [timingInterceptor, errorInterceptor, appLoggerInterceptor]
    });

    nutIocContainer.use({
        dependencyPath: './src/repositories',
        interceptor: ({ interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor } }) => [timingInterceptor, errorInterceptor, appLoggerInterceptor]
    });

    nutIocConfigurationProvider && nutIocConfigurationProvider({ nutIocContainer });

    return nutIocContainer.build();
};