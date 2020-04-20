const nutIoc = require('nut-ioc');
const commonIocContainerConfig = require('./app-ioc-container-configuration-common');

module.exports.build = ({ dependencyContainerProvider }) => {

    const nutIocContainer = nutIoc();

    commonIocContainerConfig.use({ nutIocContainer });

    nutIocContainer.use({ dependencyPath: './src/interceptors' });

    nutIocContainer.use({ dependencyPath: './src/constants' });

    nutIocContainer.use({ dependencyPath: './src/log-handler' });

    nutIocContainer.use({ dependencyPath: './src/request-handler' });

    nutIocContainer.use({
        dependencyPath: './src/controllers',
        interceptor: ({ interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor } }) => [timingInterceptor, errorInterceptor, appLoggerInterceptor]
    });

    nutIocContainer.use({
        dependencyPath: './src/repositories',
        interceptor: ({ interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor } }) => [timingInterceptor, errorInterceptor, appLoggerInterceptor]
    });

    // nutIocContainer.use({
    //     dependencyPath: './src/tests',
    //     ignoredDependencies: ['component-tests', 'contract-tests'],
    //     interceptor: ({ interceptors: { timingInterceptor } }) => [timingInterceptor]
    // });

    nutIocContainer.use({
        dependencyPath: './src/swagger-definitions',
        interceptor: ({ interceptors: { timingInterceptor } }) => [timingInterceptor]
    });

    nutIocContainer.use({
        dependencyPath: './src/swagger-downstream-definitions',
        interceptor: ({ interceptors: { timingInterceptor } }) => [timingInterceptor]
    });

    nutIocContainer.use({ dependencyPath: './src/http-server' });

    dependencyContainerProvider && dependencyContainerProvider(nutIocContainer);
    
    return nutIocContainer.build();
};
