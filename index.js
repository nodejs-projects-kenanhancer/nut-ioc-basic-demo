const nutIoc = require('nut-ioc');

const nutIocContainer = nutIoc();

const ignoredDependencies = ['node_modules',
    '.env',
    '*.json',
    '.idea',
    '.git',
    '.gitignore',
    '*.iml',
    '.*',
    '*.md',
    'LICENSE'];



const mainAsync = async () => {

    nutIocContainer.use({ dependencyPath: './', ignoredDependencies });

    nutIocContainer.useDependency({
        ServiceName: "authorBasicInfo",
        Service: ({ firstName: "Kenan", lastName: "Hancer" })
    });

    nutIocContainer.useDependency({
        ServiceName: "authorWithContacts",
        Service: ({ authorBasicInfo }) => ({ ...authorBasicInfo, city: "London", mail: "kenanhancer@gmail.com" })
    });

    const { greetingService, authorWithContacts } = await nutIocContainer.build();



    const helloMsg = greetingService.sayHello(authorWithContacts);

    console.log(helloMsg);

    const goodBydMsg = greetingService.sayGoodbye(authorWithContacts);

    console.log(goodBydMsg);
};

mainAsync();