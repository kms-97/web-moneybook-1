const CustomError = require('../error/CustomError');
const { ERROR_INFO } = require('./constant');

function validateRequired(value) {
  if (value === undefined) throw new CustomError(ERROR_INFO.MISSING_PARAMETER);
}

function validateType(value, type) {
  if (!(typeof value === type) || (type === 'number' && isNaN(value)))
    throw new CustomError(ERROR_INFO.INVALID_PARAMETER);
}

function parameterValidator(parameters) {
  parameters.forEach(([value, type]) => {
    validateRequired(value);
    validateType(value, type);
  });
}

module.exports = {
  parameterValidator,
};
