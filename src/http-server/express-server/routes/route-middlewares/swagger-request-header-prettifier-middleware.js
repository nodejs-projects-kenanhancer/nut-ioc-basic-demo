module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = async ({ swaggerDefinitions, swaggerV2RequestHeaderPrettifier }) =>
    async (req, res, next) => {

        try {
            const args = await swaggerV2RequestHeaderPrettifier({ swaggerDefinitions, ...req });

            req.args = { ...req.args, ...args };

            await next();
            
        } catch (err) {
            await next(err);
        }

    };
