// ===== Chat Middleware
// import all modules
const response = require('../helpers/response')
const { check, validationResult } = require('express-validator')

exports.isGetChatListValid = (req, res, next) => {
  const {
    page = 1,
    limit = 7
  } = req.query

  if (req.query.page && page.match(/[^0-9]/gi) !== null) {
    return response(res, 400, false, 'Invalid page')
  } else if (req.query.page && page < 1) {
    return response(res, 400, false, 'Invalid page')
  } else if (req.query.limit && typeof limit !== 'number' && limit < 1) {
    return response(res, 400, false, 'Invalid limit')
  } else if (req.query.limit && limit.toString().match(/[^0-9]/gi) !== null) {
    return response(res, 400, false, 'Invalid limit')
  }

  return next()
}

exports.checkMessage = [
  check('message', "Message can't be empty")
    .notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.checkUserId = [
  check('userId', "User Id can't be empty")
    .notEmpty(),
  check('userId', 'Invalid User Id')
    .isInt(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.checkFriendId = [
  check('friendId', "Friend Id can't be empty")
    .notEmpty(),
  check('friendId', 'Invalid Friend Id')
    .isInt(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
