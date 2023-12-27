export const FieldResponse = (message, error, statuscode) => {
  return {
    message: message,
    error: error,
    statuscode: statuscode,
    status: 0,
  };
};
