// ===== Auth Controller
// import all modules
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const randomNumbers = require('../helpers/randomNumber')
const mailer = require('../helpers/mailer')

// import all models
const users = require('../models/User')

exports.index = async (req, res) => {
  const {
    email,
    phoneNumber
  } = req.body

  try {
    const isExist = await users.findByCondition({
      email: email,
      phone_number: phoneNumber
    },
    'AND'
    )

    if (isExist.length > 0) {
      const otp = randomNumbers()
      const data = {
        id: isExist[0].id,
        email: req.body.email
      }
      const token = jwt.sign(data, process.env.SECRET, {
        expiresIn: '1h'
      })

      mailer(data.email, otp)
      return response(res, 200, true, 'Authenticate Successfully, please check your email', { otp, token, id: data.id })
    } else {
      try {
        const isExist = await users.findByCondition({
          email: req.body.email,
          phone_number: req.body.phoneNumber
        }, 'OR')

        if (isExist.length > 0) {
          return response(res, 400, false, 'Email or Phone Number has been used')
        } else {
          try {
            const results = await users.create({
              email,
              phone_number: phoneNumber
            })

            if (results.affectedRows < 1) {
              return response(res, 400, false, 'Failed to authenticate')
            } else {
              const otp = randomNumbers()
              const data = {
                id: results.insertId,
                email: req.body.email
              }
              const token = jwt.sign(data, process.env.SECRET, {
                expiresIn: '1h'
              })
              mailer(data.email, otp)
              return response(res, 200, true, 'Authenticate Successfully, please check your email', { otp, token, id: data.id })
            }
          } catch (err) {
            console.log(err)
            return response(res, 500, false, 'Server Error')
          }
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Server Error')
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}
