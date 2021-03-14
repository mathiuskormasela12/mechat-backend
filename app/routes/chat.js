// ===== User Routes
// import all modules
const express = require('express')

// import chat controllers
const chatController = require('../controllers/chatController')

// import all middlewares
const authMiddlewares = require('../middlewares/auth')
const chatMiddlewares = require('../middlewares/chat')

// init routes
const router = express.Router()

// define api endpoint
router.post(
  '/chat',
  authMiddlewares.isLogin,
  chatMiddlewares.checkFriendId,
  chatMiddlewares.checkMessage,
  chatController.create
)

router.get(
  '/chat/:friendId',
  authMiddlewares.isLogin,
  chatMiddlewares.checkFriendId,
  chatMiddlewares.isGetChatListValid,
  chatController.getAll
)

module.exports = router
