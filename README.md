# AWS HTTP API Auth Example

Basic example of how to deploy an HTTP API gatweawy with an endpoint that is accessed with an API-key style authorization.

## Deploy

Deploy to an AWS Account after authentication:

    ❯ deploy.sh

This will build node dependencies and run `serverless deploy`.


## Usage

Calling the target endpoint with the correct authorization header returns a `200`:

    ❯ curl -i --header "Authorization:${KEY}" "${ENDPOINT}"

    HTTP/2 200
    date: Thu, 01 Sep 2022 19:44:29 GMT
    content-type: text/plain; charset=utf-8
    content-length: 1201
    apigw-requestid: Xy7AahXpIAMEMxA=

    {
      "message": "Functional success!",
      ...
    }

Calling the target endpoint with the incorrect key returns a `403`.

    ❯ curl -i --header "Authorization:wrongKey" "${ENDPOINT}"

    HTTP/2 403
    date: Thu, 01 Sep 2022 19:44:45 GMT
    content-type: application/json
    content-length: 23
    apigw-requestid: Xy7DMjTxoAMEMSQ=

    {"message":"Forbidden"}%

Calling wihtout the header present returns a `401`:

    ❯ curl -i "${ENDPOINT}"

    HTTP/2 401
    date: Thu, 01 Sep 2022 19:53:41 GMT
    content-type: application/json
    content-length: 26
    apigw-requestid: Xy8W3hU-IAMEMVQ=

    {"message":"Unauthorized"}%
