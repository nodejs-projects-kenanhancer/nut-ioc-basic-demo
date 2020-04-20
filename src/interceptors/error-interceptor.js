module.exports = {
    IsInterceptor: true,
    ServiceName: "",
    Namespace: "",
    Service: ({appLogger}) =>
        async (environment, next) => {

            let result;
            try {

                result = await next(environment);

            } catch (error) {

                appLogger.error(`ERROR: ${`${environment.moduleName}.${environment.method.name}`} method`, error);

                throw error;
            }

            return result;
        }
};
