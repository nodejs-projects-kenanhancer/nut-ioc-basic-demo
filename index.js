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

    const { authorWithContacts, greetingService } = await nutIocContainer.build();




    const helloMsg = greetingService.sayHello(authorWithContacts);

    console.log(helloMsg);

    const goodBydMsg = greetingService.sayGoodbye(authorWithContacts);

    console.log(goodBydMsg);
};

mainAsync();
