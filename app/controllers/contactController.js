// ===== Contact Controller
// import all modules
const response = require('../helpers/response')

// import models
const contacts = require('../models/Contact')
const users = require('../models/User')

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
  try {
    const results = await contacts.getContactCount({
      keyword: ''
    })
    console.log(results)
  } catch (err) {
    console.log(err)
  }
}
