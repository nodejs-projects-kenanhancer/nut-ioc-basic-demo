module.exports.IsHook = true;
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = async ({swaggerDownstreamDefinitions, swaggerV2DynamicRequestServiceBuilder, dependencyContainer}) => {

    // let requests = {};
    //
    // for (const swaggerDefName in swaggerDownstreamDefinitions) {
    //     const swaggerDefinition = swaggerDownstreamDefinitions[swaggerDefName];
    //
    //     requests = {...requests, ...await swaggerV2DynamicRequestServiceBuilder.build({swaggerDefinition})};
    // }
    //
    // for (const serviceName in requests) {
    //     const {Service, ServiceName, Namespace} = requests[serviceName];
    //
    //     await dependencyContainer.useDependency({
    //         ServiceName,
    //         Namespace,
    //         Service,
    //         Interceptor: ({interceptors: {timingInterceptor, errorInterceptor, appLoggerInterceptor}}) => {
    //
    //             return [timingInterceptor, errorInterceptor, appLoggerInterceptor];
    //         }
    //     });
    // }
};
