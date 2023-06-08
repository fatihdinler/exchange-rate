const validator = require('../helper/validator');

const validate = (validations) => async (req, res, next) => {
  await validator(req.body, validations, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed error',
        error: Object.values(err?.errors).flat()
      });
    } else {
      next();
    }
  })

}
module.exports = { validate };