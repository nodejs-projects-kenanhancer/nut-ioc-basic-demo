module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ repositories: { greetingEnglishService, greetingTurkishService } }) => ({
    sayHello: async ({ firstName, lastName, language }) => {

        let response = "";

        if (language === "EN") {
            response = await greetingEnglishService.sayHello({ firstName, lastName });
        }
        else if (language === "TR") {
            response = await greetingTurkishService.sayHello({ firstName, lastName });
        }

        return response;
    },
    sayGoodbye: async ({ firstName, lastName, language }) => {
        let response = "";

        if (language === "EN") {
            response = await greetingEnglishService.sayGoodbye({ firstName, lastName });
        }
        else if (language === "TR") {
            response = await greetingTurkishService.sayGoodbye({ firstName, lastName });
        }

        return response;
    }
});