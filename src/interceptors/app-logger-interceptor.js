module.exports = {
    IsInterceptor: true,
    ServiceName: "",
    Namespace: "",
    Service: ({ appLogger}) =>
        async (environment, next) => {

            const { method, args } = environment;

            // TODO: JSON.stringify should be wrapped with try/catch
            appLogger.debug(`ENTRY: ${method.name}(${JSON.stringify(args[0])}) function`)

            const startDate = new Date();

            const result = await next(environment);

            const elapsedMilliseconds = new Date() - startDate;

            // TODO: JSON.stringify should be wrapped with try/catch
            // appLogger.debug(`SUCCESS: in ${elapsedMilliseconds} milliseconds and ${method.name} function returns ${JSON.stringify(result)}`)

            appLogger.debug(`SUCCESS: in ${elapsedMilliseconds} milliseconds and ${method.name} function returns ...`)

            return result;
        }
};
