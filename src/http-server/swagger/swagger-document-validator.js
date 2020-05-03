const swaggerParser = require("swagger-parser");

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ }) =>
    ({
        validate: async ({ swaggerDefinitions }) => {

            for (const [key, def] of Object.entries(swaggerDefinitions)) {
                const newDef = JSON.parse(JSON.stringify(def));
                delete newDef.__metadata__;

                await swaggerParser.validate(newDef, (err, api) => {
                    if (err) {
                        throw new Error('SWAGGER ERROR: Not a valid swagger  ' + err.toString());
                    } else {
                        console.log(`Swagger is validated. API name: ${api.info.title}, Version: ${api.info.version}`);
                    }
                });
            }

        }
    });
