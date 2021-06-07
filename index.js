const nutIoc = require('nut-ioc');

const nutIocContainer = nutIoc();

const ignoredDependencies = [
    'node_modules',
    '.env',
    '.idea',
    '.vscode',
    '.DS_Store',
    '.git',
    '.gitignore',
    'LICENSE',
    '*.json',
    '*.iml',
    '.*',
    '*.md'
];



nutIocContainer.use({ dependencyPath: './', ignoredDependencies });

const { greetingService } = nutIocContainer.build();




const helloMsg = greetingService.sayHello({ firstName: "kenan", lastName: "hancer" });

console.log(helloMsg);

const goodBydMsg = greetingService.sayGoodbye({ firstName: "kenan", lastName: "hancer" });

console.log(goodBydMsg);
