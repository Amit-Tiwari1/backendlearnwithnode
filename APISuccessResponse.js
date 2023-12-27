export const SuccessResponse = (message, statuscode, result) => {
  return {
    message: message,
    statuscode: statuscode,
    status: 1,
    result: result,
  };
};
