const { validationResult } = require("express-validator");
const { AppErrors } = require("./appErrors");

const handleCastError = (err, next) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  next(new AppErrors(message, 400));
};

const handleValidationError = (err, next) => {
  const errors = Object.values(err.errors).reduce((errOb, e) => {
    errOb[e.path] = e.message;
    return errOb;
  }, {});
  next(new AppErrors("Invalid data in payload", 400, errors));
};

const searchAsync = (route) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    route(req, res, next).catch((error) => {
      switch (error.name) {
        case "ValidationError":
          handleValidationError(error, next);
          break;
        case "CastError":
          handleCastError(error, next);
          break;
      }
      next(error);
    });
  };
};

module.exports = searchAsync;
