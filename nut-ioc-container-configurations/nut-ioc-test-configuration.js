const nutIoc = require('nut-ioc');
const nutIocCommonConfiguration = require('./nut-ioc-common-configuration');

module.exports.build = ({ nutIocConfigurationProvider }) => {

    const nutIocContainer = nutIoc();

    nutIocCommonConfiguration.use({ nutIocContainer });

    nutIocContainer.use({ dependencyPath: './src' });

    nutIocContainer.use({ dependencyPath: './tests' });

    nutIocContainer.useDependencyFilter({
        name: 'request-handler-dependency-filter',
        filter: ({ filePath, ignoredDependencies }) => {

            return !filePath.includes('request-handler.js');
        }
    });

    nutIocContainer.useDependency({
        ServiceName: "requestHandler",
        Namespace: undefined,
        Service: ({ genericRequestBuilder }) => ({
            executeAsync: async (options) => {

                return genericRequestBuilder({ requestArgs: options, mockServiceRequest: true });
            }
        }),
        Interceptor: ({ interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor } }) => {

            return [timingInterceptor, errorInterceptor, appLoggerInterceptor];
        }
    });

    nutIocConfigurationProvider && nutIocConfigurationProvider({ nutIocContainer });

    return nutIocContainer.build();
};
