const nutIoc = require('nut-ioc');

const nutIocContainer = nutIoc();


const mainAsync = async () => {

    nutIocContainer.useDependency({
        IsInterceptor: true,
        ServiceName: "errorInterceptor",
        Namespace: "interceptors",
        Service: ({ }) =>
            (environment, next) => {

                let result;
                try {

                    result = next(environment);

                } catch (error) {

                    appLogger.error(`ERROR: ${`${environment.moduleName}.${environment.method.name}`} method`, error);

                    throw error;
                }

                return result;
            }
    });

    nutIocContainer.useDependency({
        IsInterceptor: true,
        ServiceName: "logInterceptor",
        Namespace: "interceptors",
        Service: ({ }) =>
            (environment, next) => {

                const { method, args } = environment;

                console.log(`ENTRY: ${method.name}(${JSON.stringify(args[0])}) function`)

                const startDate = new Date();

                const result = next(environment);

                const elapsedMilliseconds = new Date() - startDate;

                console.log(`SUCCESS: ${method.name} function returns //${result}: Elapsed milliseconds is ${elapsedMilliseconds}`);

                return result;
            }
    });

    nutIocContainer.useDependency({
        ServiceName: "authorBasicInfo",
        Service: ({ firstName: "Kenan", lastName: "Hancer" })
    });

    nutIocContainer.useDependency({
        ServiceName: "authorWithContacts",
        Service: ({ authorBasicInfo }) => ({ ...authorBasicInfo, city: "London", mail: "kenanhancer@gmail.com" })
    });

    nutIocContainer.useDependency({
        ServiceName: "greetingHelper",
        Service: ({ }) => ({
            getFullName: ({ firstName, lastName }) => `${firstName} ${lastName}`
        }),
        Interceptor: ({ interceptors: { errorInterceptor, logInterceptor } }) => {

            return [errorInterceptor, logInterceptor];
        }
    });

    nutIocContainer.useDependency({
        ServiceName: "greetingService",
        Service: ({ greetingHelper: { getFullName } }) => ({
            sayHello: ({ firstName, lastName }) => {

                const fullName = getFullName({ firstName, lastName });

                return `Hello ${fullName}`;
            },
            sayGoodbye: ({ firstName, lastName }) => {
                const fullName = getFullName({ firstName, lastName });

                return `Goodbye, ${fullName}`;
            }
        }),
        Interceptor: ({ interceptors: { errorInterceptor, logInterceptor } }) => {

            return [errorInterceptor, logInterceptor];
        }
    });

<<<<<<< HEAD
=======
    nutIocContainer.useDependency({
        ServiceName: "requestHandler",
        Service: ({})=> ({
            executeAsync: async (requestArgs) => {
                console.log(requestArgs);

                return "Hello World";
            }
        })
    });

    nutIocContainer.useDependency({
        ServiceName: "greetingServiceV2",
        Service: ({ requestHandler }) => {

            return {
                sayHello: async ({ firstName,lastName }) => {
                    const requestArgs = {
                        method: "GET",
                        schemes: "http",
                        host: "api.lbg.xyz",
                        basePath: "/greeting-api/v1",
                        path: "/sayHello",
                        url: "http://api.lbg.xyz/greeting-api/v1/sayHello",
                        payload: undefined,
                        headers: {
                            "firstName": firstName || '',
                            "lastName": lastName || ''
                        }
                    };
                    
                    const response = await requestHandler.executeAsync(requestArgs);
        
                    return response;
                },
                sayGoodbye: async ({ firstName,lastName }) => {
                    const requestArgs = {
                        method: "GET",
                        schemes: "http",
                        host: "api.lbg.xyz",
                        basePath: "/greeting-api/v1",
                        path: "/sayGoodbye",
                        url: "http://api.lbg.xyz/greeting-api/v1/sayGoodbye",
                        payload: undefined,
                        headers: {
                            "firstName": firstName || '',
                            "lastName": lastName || ''
                        }
                    };
                    
                    const response = await requestHandler.executeAsync(requestArgs);
        
                    return response;
                }
            };
        
        }
    })

>>>>>>> load-dependencies-with-interceptors
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

    nutIocContainer.use({ dependencyPath: './swagger-definitions' });

<<<<<<< HEAD
    const { authorWithContacts, greetingService, swaggerDefinitions } = await nutIocContainer.build();
=======
    const { authorWithContacts, greetingService, greetingServiceV2, swaggerDefinitions } = await nutIocContainer.build();


    const helloMsvV2 = await greetingServiceV2.sayHello(authorWithContacts);
>>>>>>> load-dependencies-with-interceptors

    console.log(helloMsvV2);

    console.log();


    const helloMsg = greetingService.sayHello(authorWithContacts);

    console.log(helloMsg);

    const goodBydMsg = greetingService.sayGoodbye(authorWithContacts);

    console.log(goodBydMsg);

    console.log();

    console.log('swaggerDefinitions:', swaggerDefinitions);
};

mainAsync();
