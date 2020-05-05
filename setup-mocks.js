const { getNutIocContainer } = require('./nut-ioc-container-configurations');

const nutIocContainer = getNutIocContainer({ name: 'nut-ioc-test-configuration' });

const mainAsync = async () => {

    const { repositories: { greetingEnglishService, greetingTurkishService, greetingHelperService }, mockHelper: { createExpectation, resetMockServer, setupExpectation } } = await nutIocContainer.build({});

    await resetMockServer();



    const person = { firstName: 'Kenan', lastName: 'Hancer' };

    // Greeting Helper Service
    let request = await greetingHelperService.getFullName(person);

    let response = { statusCode: 200, body: `${person.firstName} ${person.lastName}` };

    await createExpectation(request, response);


    // English Greeting Service
    request = await greetingEnglishService.sayHello(person);

    response = { statusCode: 200, body: `Hello ${person.firstName} ${person.lastName}` };

    await createExpectation(request, response);


    request = await greetingEnglishService.sayGoodbye(person);

    response = { statusCode: 200, body: `Good bye ${person.firstName} ${person.lastName}` };

    await createExpectation(request, response);



    // Turkish Greeting Service
    request = await greetingTurkishService.sayHello(person);

    response = { statusCode: 200, body: `Merhaba ${person.firstName} ${person.lastName}` };

    await createExpectation(request, response);


    request = await greetingTurkishService.sayGoodbye(person);

    response = { statusCode: 200, body: `Gule gule ${person.firstName} ${person.lastName}` };

    await createExpectation(request, response);

};

mainAsync();
