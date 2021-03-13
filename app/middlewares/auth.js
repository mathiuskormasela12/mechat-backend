// ===== Auth Middleware
// import all modules
const response = require('../helpers/response')
const { check, validationResult, param } = require('express-validator')

exports.checkEmail = [
  check('phoneNumber', "Phone number can't be empty")
    .notEmpty(),
  check('phoneNumber', 'Invalid phone number')
    .isMobilePhone(),
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

exports.checkPhoneNumber = [
  check('email', "Email can't be empty")
    .notEmpty(),
  check('email', 'Invalid email address')
    .isEmail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
