function validatorParamsApi(request, schema) {
  const isValid = schema.validate(request);
  if (isValid.error)
    return {
      valid: false,
      error: isValid.error.details[0].context.key,
      message: isValid.error.details[0].message,
    };
  else
    return {
      valid: true,
      error: "",
    };
}

module.exports = validatorParamsApi;
