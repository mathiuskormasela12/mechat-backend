// ===== User Middleware
// import all modules
const response = require('../helpers/response')
const { check, validationResult, param } = require('express-validator')

exports.isGetContactListValid = (req, res, next) => {
  const {
    page = 1,
    limit = 7,
    sort = 'ASC',
    by = 'contact_name'
  } = req.query

  const validSort = [
    'contact_name',
    'createdAt'
  ]

  if (req.query.page && page.match(/[^0-9]/gi) !== null) {
    return response(res, 400, false, 'Invalid page')
  } else if (req.query.page && page < 1) {
    return response(res, 400, false, 'Invalid page')
  } else if (req.query.limit && typeof limit !== 'number' && limit < 1) {
    return response(res, 400, false, 'Invalid limit')
  } else if (req.query.limit && limit.toString().match(/[^0-9]/gi) !== null) {
    return response(res, 400, false, 'Invalid limit')
  } else if (req.query.sort && sort.toUpperCase() !== 'ASC' && sort.toUpperCase() !== 'DESC') {
    return response(res, 400, false, 'Invalid sort')
  } else if (req.query.by && validSort.indexOf(by) === -1) {
    return response(res, 400, false, 'Invalid query')
  }

  return next()
}

exports.checkContactName = [
  check('contactName', "Contact name can't be empty")
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
