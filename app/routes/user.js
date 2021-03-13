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

module.exports = router
