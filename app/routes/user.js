// ===== User Routes
// import all modules
const express = require('express')

// import auth controllers
const userController = require('../controllers/userController')

// import all middlewares
const userMiddlewares = require('../middlewares/user')
const authMiddlewares = require('../middlewares/auth')

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
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userMiddlewares.checkEmail,
  userController.updateEmail
)

router.put(
  '/user/phonenumber/:id',
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userMiddlewares.checkPhoneNumber,
  userController.updatePhoneNumber
)

router.put(
  '/user/about/:id',
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userMiddlewares.checkAbout,
  userController.updateAbout
)

router.delete(
  '/user/:id',
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userController.delete
)

router.get(
  '/user/:id',
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userController.getUserById
)

router.put(
  '/user/upload/:id',
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userController.upload
)

router.put(
  '/user/status/:id',
  authMiddlewares.isLogin,
  userMiddlewares.checkId,
  userMiddlewares.checkStatus,
  userController.updateStatus
)

module.exports = router
