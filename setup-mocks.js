const { getNutIocContainer } = require('./nut-ioc-container-configurations');

const nutIocContainer = getNutIocContainer({ name: 'nut-ioc-test-configuration' });

const mainAsync = async () => {

    const { repositories: { greetingEnglishService }, mockHelper: { createExpectation, resetMockServer, setupExpectation } } = await nutIocContainer.build({});

    await resetMockServer();

    const request = await greetingEnglishService.sayHello({ firstName: "Kenan", lastName: "Hancer" });

    const response = { statusCode: 200, body: "Hello Kenan Hancer" };

    await createExpectation(request, response);

};

mainAsync();
