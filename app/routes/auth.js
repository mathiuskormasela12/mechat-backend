// ===== Auth Routes
// import all modules
const express = require('express')

// import auth controllers
const authController = require('../controllers/authController')

// import all middlewares
const authMiddlewares = require('../middlewares/auth')

// init routes
const router = express.Router()

// define api endpoint
router.post(
  '/auth',
  authMiddlewares.checkEmail,
  authMiddlewares.checkPhoneNumber,
  authController.index
)

module.exports = router
