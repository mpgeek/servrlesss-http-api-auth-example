exports.handler = async(event) => {
    console.info("EVENT\n" + JSON.stringify(event, null, 2));

    const AWS = require('aws-sdk');
    const client = new AWS.SecretsManager({region: process.env.AWS_REGION});

    let response = {
        "isAuthorized": false
    };

    await client.getSecretValue({SecretId: process.env.SECRET_NAME}, function(err, data) {

        var secret;

        if (err) {
            throw err;
        }
        else {
            if ('SecretString' in data) {
                secret = data.SecretString;
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                secret = buff.toString('ascii');
            }
        }

        if (event.headers.authorization === secret) {
            response.isAuthorized = true;
        }

    }).promise();

    console.info("AUTH RESPONSE\n" + JSON.stringify(response, null, 2));
    return response;
}
