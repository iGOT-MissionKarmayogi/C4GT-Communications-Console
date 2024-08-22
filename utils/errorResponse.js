const createErrorResponse = (
  id,
  resmsgid,
  status,
  err,
  errmsg,
  responseCode
) => ({
  id,
  ver: "1.0",
  ts: new Date().toISOString(),
  params: {
    resmsgid,
    msgid: null,
    err,
    status,
    errmsg,
  },
  responseCode,
  result: null,
});

module.exports = { createErrorResponse };
