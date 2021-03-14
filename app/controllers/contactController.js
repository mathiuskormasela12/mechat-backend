// ===== Contact Controller
// import all modules
const response = require('../helpers/response')

// import models
const contacts = require('../models/Contact')
const users = require('../models/User')

const { PHOTO_URL } = process.env

exports.create = async (req, res) => {
  const { phoneNumber, contactName } = req.body

  try {
    const data = await users.findByCondition({
      phone_number: phoneNumber
    }, ' AND ')

    if (data.length > 0) {
      const isExist = await contacts.findByCondition({
        friend_id: data[0].id
      })

      if (isExist.length > 0) {
        return response(res, 400, false, 'Contact is exists')
      } else {
        const results = await contacts.create({
          user_id: req.data.id,
          friend_id: data[0].id,
          contact_name: contactName
        })

        if (results.affectedRows < 1) {
          return response(res, 400, false, 'Failed to add new contact')
        } else {
          return response(res, 200, true, 'Sucessfully to add new contact')
        }
      }
    } else {
      return response(res, 400, false, 'Unknown contact')
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

  try {
    const startData = (limit * page) - limit
    const totalData = await contacts.getContactCount({
      keyword: '',
      id: req.data.id
    })
    const totalPages = Math.ceil(totalData / limit)
    const results = await contacts.findAll({
      keyword: search,
      offset: startData,
      limit,
      id: req.data.id
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Contact not availabled', [], totalData, totalPages, page, req)
    } else {
      const modifiedResults = results.map(item => ({
        ...item,
        picture: PHOTO_URL.concat(`/${item.picture}`)
      }))
      return response(res, 200, true, 'Successfully to get all contacts', modifiedResults, totalData, totalPages, page, req)
    }
  } catch (err) {
    console.log(err)
  }
}
