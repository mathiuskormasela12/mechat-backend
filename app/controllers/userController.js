// ===== User Controller
// import all modules
const response = require('../helpers/response')
const upload = require('../helpers/upload')

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
      req.socket.emit('Update Full Name', data.full_name)
      return response(res, 200, true, 'Successfuly to update fullname', {
        fullName: req.body.fullName
      })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.updateAbout = async (req, res) => {
  const data = {
    about: req.body.about
  }

  try {
    const results = await users.update(data, req.params.id)

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to edit about')
    } else {
      req.socket.emit('Update_About', data.full_name)
      return response(res, 200, true, 'Successfully to update about', {
        about: req.body.about
      })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.updatePhoneNumber = async (req, res) => {
  const data = {
    phone_number: req.body.phoneNumber
  }

  try {
    const results = await users.update(data, req.params.id)

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to edit phone number')
    } else {
      req.socket.emit('Update_Phone_Number', data.phone_number)
      return response(res, 200, true, 'Successfuly to update phone number', {
        phoneNumber: req.body.phoneNumber
      })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.updateEmail = async (req, res) => {
  const data = {
    email: req.body.email
  }

  try {
    const results = await users.update(data, req.params.id)

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to edit email')
    } else {
      req.socket.emit('Update_Email', data.email)
      return response(res, 200, true, 'Successfuly to update email', {
        email: req.body.email
      })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.delete = async (req, res) => {
  try {
    const results = await users.delete(req.params.id)

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to remove account')
    } else {
      return response(res, 200, true, 'Successfuly to remove account')
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.getUserById = async (req, res) => {
  try {
    const results = await users.findByCondition({ id: req.params.id }, 'AND')

    if (results.length < 1) {
      return response(res, 400, false, 'User not found', [])
    } else {
      const data = {
        ...results[0],
        picture: process.env.PHOTO_URL.concat('/', results[0].picture)
      }
      return response(res, 200, true, 'Successfuly to get user', data)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.upload = async (req, res) => {
  const picture = await upload(req)

  if (typeof picture !== 'string') {
    return response(res, picture.status, picture.success, picture.message)
  } else {
    try {
      await users.update({ picture }, req.params.id)
      req.socket.emit('Update_Profile_Picture', picture)
      return response(res, 200, true, 'Successfuly to update user profile')
    } catch (err) {
      console.log(err)
      return response(res, 500, false, 'Server Error')
    }
  }
}

exports.updateStatus = async (req, res) => {
  const data = {
    status: req.body.status
  }

  try {
    const results = await users.update(data, req.params.id)

    if (results.affectedRows < 1) {
      return response(res, 400, false, 'Failed to edit status')
    } else {
      req.socket.emit('Update_Status', data.full_name)
      return response(res, 200, true, 'Successfully to update status', {
        status: req.body.status
      })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}
