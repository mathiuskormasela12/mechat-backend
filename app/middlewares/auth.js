// ===== Auth Middleware
// import all modules
const response = require('../helpers/response')
const { check, validationResult, param } = require('express-validator')

exports.checkPhoneNumber = [
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

exports.checkEmail = [
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

exports.checkOtp = [
  check('otp', "OTP can't be empty")
    .notEmpty(),
  check('otp', 'Invalid OTP')
    .isNumeric(),
  check('otp', 'Invalid OTP')
    .isLength({
      min: 6,
      max: 6
    }),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
