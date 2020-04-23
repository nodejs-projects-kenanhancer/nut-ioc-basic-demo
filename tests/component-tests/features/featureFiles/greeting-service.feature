@greeting-service-get
Feature: Greeting service

    Background: Resets the mock server
        Given Reset mock server

    @complete
    Scenario Outline: Verify happy flow of say hello
        Given New mock data for say hello for <statusCode> and <firstName> and <lastName>
        Then I make GET request to say hello method for <firstName> and <lastName>
        And Response status code is <statusCode>

        Examples:
            | firstName | lastName | statusCode |
            | Kenan     | Hancer   | 200        |
            | Hasan     | Ozgul    | 200        |

    @complete
    Scenario Outline: Verify un happy flow of say hello
        Given New mock data for say hello for <statusCode> and <firstName> and <lastName>
        Then I make GET request to say hello for <firstName> and <lastName>
        And Response status code are <statuscode1>

        Examples:
            | firstName | lastName | statusCode | statuscode1 |
            | Kenan     | Hancer   | 200        | 500         |
            | Hasan     | Ozgul    | 200        | 500         |
