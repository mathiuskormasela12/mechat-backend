// ===== Chat Controller
// import all modules
const response = require('../helpers/response')
const moment = require('moment')

// import models
const chats = require('../models/Chat')
// const users = require('../models/User')

exports.create = async (req, res) => {
  try {
    const results = await chats.create({
      user_id: req.data.id,
      friend_id: req.body.friendId,
      message: req.body.message
    })

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to send message')
    } else {
      req.socket.emit('Send_Message', req.body)
      return response(res, 200, true, 'Sucessfully to send message')
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.getAll = async (req, res) => {
  const {
    page = 1,
    search = '',
    limit = 7
  } = req.query
  const { friendId } = req.params

  try {
    const startData = (limit * page) - limit
    const totalData = await chats.getChatCount({
      keyword: '',
      id: req.data.id,
      friendId
    })
    const totalPages = Math.ceil(totalData / limit)
    const results = await chats.findAll({
      keyword: search,
      offset: startData,
      limit,
      id: req.data.id,
      friendId
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Chat not availabled', [], totalData, totalPages, page, req)
    } else {
      const modifiedResults = results.map(item => ({
        ...item,
        time: moment(item.createdAt).format('HH:mm'),
        date: moment(item.createdAt).format('D MMM YYYY'),
        mine: (Number(req.data.id) === Number(item.user_id))
      }))
      return response(res, 200, true, 'Successfully to get all chats', modifiedResults, totalData, totalPages, page, req)
    }
  } catch (err) {
    console.log(err)
  }
}
