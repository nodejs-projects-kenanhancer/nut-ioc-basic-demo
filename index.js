const nutIoc = require('nut-ioc');

const nutIocContainer = nutIoc();




nutIocContainer.useDependency({
    IsInterceptor: true,
    ServiceName: "errorInterceptor",
    Namespace: "interceptors",
    Service: ({ }) =>
        (context, next) => {

            let result;
            try {

                result = next(context);

            } catch (error) {

                appLogger.error(`ERROR: ${`${context.moduleName}.${context.method.name}`} method`, error);

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
        (context, next) => {

            const { method, args } = context;

            console.log(`ENTRY: ${method.name}(${JSON.stringify(args[0])}) function`)

            const startDate = new Date();

            const result = next(context);

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

nutIocContainer.use({ dependencyPath: './swaggerDocuments' });

const { authorWithContacts, greetingService, swaggerDefinitions } = nutIocContainer.build();






const helloMsg = greetingService.sayHello(authorWithContacts);

console.log(helloMsg);

const goodBydMsg = greetingService.sayGoodbye(authorWithContacts);

console.log(goodBydMsg);

console.log();

console.log('swaggerDefinitions:', swaggerDefinitions);
