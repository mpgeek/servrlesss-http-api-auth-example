exports.handler = async(event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Functional success!",
        input: event,
      },
      null,
      2
    ),
  };
};


