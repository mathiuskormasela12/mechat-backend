// ===== User Middleware
// import all modules
const response = require('../helpers/response')
const { check, validationResult, param } = require('express-validator')

exports.checkFullname = [
  check('fullName', "Fullname can't be empty")
    .notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.checkId = [
  param('id', 'Invalid Id')
    .isInt(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
