export const hello = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
      },
      null,
      2
    ),
  };
};
