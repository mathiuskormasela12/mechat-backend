module.exports = (req) => {
  if (!req.files) {
    return {
      status: 400,
      success: false,
      message: 'Must upload profile picture'
    }
  }

  const photo = req.files.picture

  const extValid = /jpg|jpeg|png/gi
  const checkExt = extValid.test(photo.name.split('.').pop())
  const checkMime = extValid.test(photo.mimetype)

  if (!checkExt && !checkMime) {
    return {
      status: 400,
      success: false,
      message: 'what you upload is not an image'
    }
  }

  if (photo.size > 3000000) {
    return {
      status: 400,
      success: false,
      message: 'Profile picture size max 3mb'
    }
  }

  let poster = photo.name.split('.')[0]
  poster += '-'
  poster += Date.now()
  poster += '.'
  poster += photo.name.split('.').pop().toLowerCase()

  photo.mv('./public/uploads/' + poster)
  return poster
}
