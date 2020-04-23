# nut-ioc-basic-demo

This is a demo project to use **nut-ioc** npm package all features. Notice that there are branch list below for this repository so that you can switch between branches for different usages of **nut-ioc** features.

**nut-swagger-usage** branch is merged to master so master branch includes advanced scenarios.

Branch list |
------------------------------------------------------ |
load-dependencies-with-dependencyPath |
load-dependencies-with-dependencyPath-and_dynamically |
load-dependencies-with-different-loaders |
load-dependencies-with-interceptors |
load-dependencies-with-new-loaders-and-filters |
load-dependencies-with-programatic-notation |
nut-swagger-usage |


In order to run service properly,

## Running mock server

If mock server already runs, then no need to run the following command.

```shell script
npm run start:mock:server
```

## Creating Mock Expectations and pushing to mock server

```shell script
npm run setup:mocks
```

## Running Microservice

```shell script
npm start
```

## Testing Microservice

You can test microservice with **Swagger UI**, **CURL** or **Postman app**.

**Swagger UI**

Open the following link in browser so that you can make request from UI side.

http://localhost:8080/api-docs/greeting-api/v1/

**CURL**

Run following command in your terminal.

```shell script
curl -X GET "http://localhost:8080/greeting-api/v1/sayHello" -H "accept: application/json" -H "language: EN" -H "firstName: kenan" -H "lastName: hancer"
```