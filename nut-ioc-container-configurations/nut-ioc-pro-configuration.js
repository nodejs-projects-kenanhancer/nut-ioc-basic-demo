const nutIoc = require('nut-ioc');
const nutIocCommonConfiguration = require('./nut-ioc-common-configuration');

module.exports.build = ({ nutIocConfigurationProvider }) => {

    const nutIocContainer = nutIoc();

    nutIocCommonConfiguration.use({ nutIocContainer });

    nutIocContainer.useConfiguration({
        dependencyLoader: ({ loaders }) => {
            // console.log(loaders);
        },
        dependencyFilter: ({ filters }) => {

            // delete filters['defaultModuleFilter'];
            // console.log(filters);
        }
    });

    nutIocContainer.useDependencyLoader({
        name: 'test-dependency-loader',
        loader: ({ filePath, nameProvider }) => {
            // console.log(filePath);
        }
    });

    nutIocContainer.useDependencyLoader({
        name: 'test-dependency-loader-2',
        loader: ({ filePath, nameProvider }) => {
            // console.log(filePath);
        }
    });

    nutIocContainer.useDependencyFilter({
        name: 'test-dependency-filter',
        filter: ({ filePath, ignoredDependencies }) => {
            // console.log(filePath);

            return true;
        }
    });

    nutIocContainer.useDependencyFilter({
        name: 'test-dependency-filter-2',
        filter: ({ filePath, ignoredDependencies }) => {
            // console.log(filePath);

            return true;
        }
    });

    const ignoredInterceptors = ['appLogger'];

    nutIocContainer.use({
        dependencyPath: './src',
        ignoredDependencies: [],
        interceptor: ({ serviceName, namespace, dependencyProvider, interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor, downstreamErrorInterceptor } }) => {
            // const {timingInterceptor, errorInterceptor, appLoggerInterceptor} = dependencyProvider(['timingInterceptor', 'errorInterceptor', 'appLoggerInterceptor']);

            if (serviceName === 'greetingService') {
                return [errorInterceptor, appLoggerInterceptor];
            } else if (namespace === 'repositories') {
                return [timingInterceptor, downstreamErrorInterceptor, appLoggerInterceptor];
            } else if (ignoredInterceptors.some(item => item === serviceName)) {
                return [];
            }

            return [timingInterceptor, errorInterceptor];
        }
    });

    nutIocConfigurationProvider && nutIocConfigurationProvider({ nutIocContainer });

    return nutIocContainer.build();
};