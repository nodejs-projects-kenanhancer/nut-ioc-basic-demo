const nutIoc = require('nut-ioc');

const nutIocContainer = nutIoc();


const mainAsync = async () => {


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

    nutIocContainer.use({ dependencyPath: './', ignoredDependencies });

    const { greetingService } = await nutIocContainer.build();




    const helloMsg = greetingService.sayHello({ firstName: "kenan", lastName: "hancer" });

    console.log(helloMsg);

    const goodBydMsg = greetingService.sayGoodbye({ firstName: "kenan", lastName: "hancer" });

    console.log(goodBydMsg);
};

mainAsync();
