// ===== User Controller
// import all modules
const response = require('../helpers/response')

// import all models
const users = require('../models/User')

exports.updateFullName = async (req, res) => {
  const data = {
    full_name: req.body.fullName
  }

  try {
    const results = await users.update(data, req.params.id)

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to add full name')
    } else {
      return response(res, 200, true, 'Welcome to MeChat', {
        fullName: req.body.fullName
      })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}
