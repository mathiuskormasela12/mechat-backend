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

      try {
        await users.update({
          otp
        }, isExist[0].id)
        mailer(req.body.email, otp)
        return response(res, 200, true, 'Authenticate Successfully, please check your email', {
          email: req.body.email,
          id: isExist[0].id
        })
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Server Error')
      }
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
              try {
                await users.update({ otp }, results.insertId)
                mailer(req.body.email, otp)
                return response(res, 200, true, 'Authenticate Successfully, please check your email', {
                  email: req.body.email,
                  id: results.insertId
                })
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
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.verifyOtp = async (req, res) => {
  const { otp } = req.body
  const { id } = req.params
  try {
    const isExist = await users.findByCondition({ otp, id }, 'AND')

    if (isExist.length < 1) {
      return response(res, 400, false, 'Wrong OTP')
    } else {
      try {
        await users.update({ otp: null }, id)
        const data = {
          id: isExist[0].id,
          email: isExist[0].email
        }
        const token = jwt.sign(data, process.env.SECRET, {
          expiresIn: '1h'
        })

        return response(res, 200, true, 'Welcome to MeChat', { token })
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
