// ===== User Routes
// import all modules
const express = require('express')

// import auth controllers
const userController = require('../controllers/userController')

// import all middlewares
const userMiddlewares = require('../middlewares/user')

// init routes
const router = express.Router()

// define api endpoint
router.put(
  '/user/fullname/:id',
  userMiddlewares.checkId,
  userMiddlewares.checkFullname,
  userController.updateFullName
)

router.put(
  '/user/email/:id',
  userMiddlewares.checkId,
  userMiddlewares.checkEmail,
  userController.updateEmail
)

router.put(
  '/user/phonenumber/:id',
  userMiddlewares.checkId,
  userMiddlewares.checkPhoneNumber,
  userController.updatePhoneNumber
)

router.put(
  '/user/about/:id',
  userMiddlewares.checkId,
  userMiddlewares.checkAbout,
  userController.updateAbout
)

router.delete(
  '/user/:id',
  userMiddlewares.checkId,
  userController.delete
)

router.get(
  '/user/:id',
  userMiddlewares.checkId,
  userController.getUserById
)

router.put(
  '/user/upload/:id',
  userMiddlewares.checkId,
  userController.upload
)

module.exports = router
