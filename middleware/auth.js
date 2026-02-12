const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "unathorized"
    })
  }
  const accessToken = authHeader.split(" ")[1]
  const decode = jwt.verify(accessToken, process.env.JWT_SECRET)
  
  req.user = decode
  next()
  } catch (e) {
   res.status(401).json({
      success: false,
      message: "token invalid"
    })
  }
  
}

module.exports = {verifyToken}