const nutIoc = require('nut-ioc');
const commonIocContainerConfig = require('./app-ioc-container-configuration-common');

module.exports.build = ({ dependencyContainerProvider }) => {

    const nutIocContainer = nutIoc();

    commonIocContainerConfig.use({ nutIocContainer });

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
            // console.log();
        }
    });

    nutIocContainer.useDependencyLoader({
        name: 'test-dependency-loader-2',
        loader: ({ filePath, nameProvider }) => {
            // console.log();
        }
    });

    nutIocContainer.useDependencyFilter({
        name: 'test-dependency-filter',
        filter: ({ filePath, ignoredDependencies }) => {
            // console.log();

            return true;
        }
    });

    nutIocContainer.useDependencyFilter({
        name: 'test-dependency-filter-2',
        filter: ({ filePath, ignoredDependencies }) => {
            // console.log();

            return true;
        }
    });

    const ignoredInterceptors = ['appLogger'];

    nutIocContainer.use({
        dependencyPath: './src',
        ignoredDependencies: [],
        interceptor: ({ serviceName, namespace, dependencyProvider, interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor } }) => {
            // const {timingInterceptor, errorInterceptor, appLoggerInterceptor} = dependencyProvider(['timingInterceptor', 'errorInterceptor', 'appLoggerInterceptor']);

            if (serviceName === 'greetingService') {
                return [errorInterceptor, appLoggerInterceptor];
            }
            else if (namespace === 'repositories') {
                return [timingInterceptor, errorInterceptor, appLoggerInterceptor];
            } else if (ignoredInterceptors.some(item => item === serviceName)) {
                return [];
            }

            return [timingInterceptor, errorInterceptor];
        }
    });

    dependencyContainerProvider && dependencyContainerProvider(nutIocContainer);

    return nutIocContainer.build();
};
