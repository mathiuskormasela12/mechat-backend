// ===== Contact Routes
// import all modules
const express = require('express')

// import auth controllers
const contactController = require('../controllers/contactController')

// import all middlewares
const contactMiddlewares = require('../middlewares/contact')
const authMiddlewares = require('../middlewares/auth')

// init routes
const router = express.Router()

// define api endpoint
router.post(
  '/contact',
  authMiddlewares.isLogin,
  contactMiddlewares.checkContactName,
  contactMiddlewares.checkPhoneNumber,
  contactController.create
)

router.get(
  '/contact',
  authMiddlewares.isLogin,
  contactController.getAll
)

module.exports = router
