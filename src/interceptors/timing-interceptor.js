module.exports = {
    IsInterceptor: true,
    ServiceName: "",
    Namespace: "",
    Service: ({}) =>
        async (environment, next) => {

            const startDate = new Date();

            const result = await next(environment);

            const elapsedMilliseconds = new Date() - startDate;

            // console.log(`Elapsed milliseconds is ${elapsedMilliseconds} for ${environment.moduleName}.${environment.method.name} method`);

            return result;
        }
};
