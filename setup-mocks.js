const appIocConfig = require('./app-ioc-container-configurations/app-ioc-container-configuration-expert');

const mainAsync = async () => {

    const dependencyContainerProvider = (nutIocContainer) => {

        nutIocContainer.useDependencyFilter({
            name: 'request-handler-dependency-filter',
            filter: ({ filePath, ignoredDependencies }) => {

                return !filePath.includes('request-handler');
            }
        });

        nutIocContainer.use({
            dependencyPath: './tests',
            ignoredDependencies: ['component-tests', 'contract-tests'],
            interceptor: ({ interceptors: { timingInterceptor } }) => [timingInterceptor]
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
    };

    const { repositories: { greetingEnglishService }, mockHelper: { createExpectation, resetMockServer, setupExpectation } } = await appIocConfig.build({ dependencyContainerProvider });

    await resetMockServer();

    const request = await greetingEnglishService.sayHello({ firstName: "Kenan", lastName: "Hancer" });

    const response = { statusCode: 200, body: "Hello Kenan Hancer" };

    await createExpectation(request, response);

};

mainAsync();
