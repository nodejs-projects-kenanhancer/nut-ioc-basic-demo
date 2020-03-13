const nutIoc = require('nut-ioc');

const nutIocContainer = nutIoc();


const mainAsync = async () => {

    nutIocContainer.useDependency({
        ServiceName: "authorBasicInfo",
        Service: ({ firstName: "Kenan", lastName: "Hancer" })
    });

    nutIocContainer.useDependency({
        ServiceName: "authorWithContacts",
        Service: ({ authorBasicInfo }) => ({ ...authorBasicInfo, city: "London", mail: "kenanhancer@gmail.com" })
    });

    nutIocContainer.useDependency({
        ServiceName: "greetingHelper",
        Service: ({ }) => ({
            getFullName: ({ firstName, lastName }) => `${firstName} ${lastName}`
        })
    });

    nutIocContainer.useDependency({
        ServiceName: "greetingService",
        Service: ({ greetingHelper: { getFullName } }) => ({
            sayHello: ({ firstName, lastName }) => {

                const fullName = getFullName({ firstName, lastName });

                return `Hello ${fullName}`;
            },
            sayGoodbye: ({ firstName, lastName }) => {
                const fullName = getFullName({ firstName, lastName });

                return `Goodbye, ${fullName}`;
            }
        })
    });

    const { authorWithContacts, greetingService } = await nutIocContainer.build();




    const helloMsg = greetingService.sayHello(authorWithContacts);

    console.log(helloMsg);

    const goodBydMsg = greetingService.sayGoodbye(authorWithContacts);

    console.log(goodBydMsg);
};

mainAsync();
