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

exports.checkStatus = [
  check('status', "Status can't be empty")
    .notEmpty(),
  check('status', 'Status length must must be lower than 80 character')
    .isLength({
      max: 81
    }),
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

exports.checkAbout = [
  check('about', "About can't be empty")
    .notEmpty(),
  check('about', 'About max 200 character')
    .isLength({
      max: 200
    }),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
