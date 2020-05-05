module.exports = {
    IsInterceptor: true,
    ServiceName: "",
    Namespace: "",
    Service: ({ appLogger, serverErrors: { DownstreamError } }) =>
        async (environment, next) => {

            let result;
            try {

                result = await next(environment);

            } catch (error) {

                const errorMessage = `ERROR: ${`${environment.moduleName}.${environment.method.name}`} method`;

                appLogger.error(errorMessage, error);

                throw new DownstreamError({ message: errorMessage });
            }

            return result;
        }
};
