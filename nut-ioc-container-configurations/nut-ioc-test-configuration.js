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

    // nutIocContainer.useDependencyHook({
    //     Name: "",
    //     Hook: ({ swaggerDownstreamDefinitions, appEnv }) => {

    //         Object.entries(appEnv).filter(([key, value]) => key.includes('ds.')).forEach(([key, value]) => {
    //             const [group, serviceName, fieldName] = key.split('.');

    //             swaggerDownstreamDefinitions[serviceName][fieldName] = value;
    //         });
    //     }
    // });

    nutIocConfigurationProvider && nutIocConfigurationProvider({ nutIocContainer });

    return nutIocContainer.build();
};
