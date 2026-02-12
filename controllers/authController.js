const User = require('../models/userModel')
const RefreshToken = require('../models/refreshTokenModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { username, noWa, password } = req.body
  if (!username || !noWa || !password) {
    return res.status(400).json({
      success: false,
      message: "harap isi semua bidang"
    })
  }
  try {
    const userExist = await User.findOne({
      $or: [{ username }, { noWa }]
    })

    if (userExist) {
      if (username === userExist.username) {
        return res.status(400).json({
          success: false,
          message: "harap gunakan username lain"
        })
      }
      if (noWa === userExist.noWa) {
        return res.status(400).json({
          success: false,
          message: "nomor whatsapp sudah terdaftar"
        })
      }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      noWa,
      password: hashedPassword
    })
    await newUser.save()
    res.status(201).json({
      success: true,
      message: "register berhasil"
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "register gagal"
    })
  }
}

exports.login = async (req, res) => {
const {username, password} = req.body
if (!username || !password) {
  return res.status(400).json({
    success: false,
    message: "harap isi semua bidang"
  })
}

try {
  //cari user di database
  const user = await User.findOne({username})
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "username tidak di temukan"
    })
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "kata sandi salah"
    })
  }
  
  //membuat jwt
  const payload = {id: user._id, role: user.role}
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "5m"})
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "7d"})
  
  await RefreshToken.findOneAndUpdate({user: user._id}, {
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now()+7 * 24 * 60 * 60 * 1000)
  },
  {
    upsert: true,
    new: true
  }
  )
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure:true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  
  res.status(200).json({
    success: true,
    accessToken,
    message: "login berhasil",
    data: {
      role: user.role
    }
  })
} catch (e) {
  console.log(e)
  res.status(500).json({
    success: false,
    message: "login gagal"
  })
}
}

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "unathorized"
    })
  }
  try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    
    const tokenStored = await RefreshToken.findOne({user: decode.id, token: refreshToken})
    if (!tokenStored) {
      return res.status(401).json({
      success: false,
      message: "refresh token tidak di temukan"
    })
    }
    const newAccessToken = jwt.sign({id: decode.id, role: decode.role}, process.env.JWT_SECRET, {expiresIn: "5m"})
    
    res.status(200).json({
      success: true,
      accessToken: newAccessToken
    })
  } catch (e) {
    console.log(e)
    res.status(401).json({
      success: false,
      message: "invalid refresh token"
    })
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.id})
    
    res.status(200).json({
      success: true,
      message: "user di temukan",
      data: user
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
        success: false,
        message: "user tidak di temukan"
      })
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const data = await User.find()
    res.status(200).json({
      success: true,
      message: "berhasil mengambil data",
      data
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "gagal mengambil data"
    })
  }
}

exports.logout = async (req, res) => {
  try {
    // 1. Ambil refresh token dari cookies
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // 2. Hapus refresh token dari database agar tidak bisa digunakan refresh lagi
      await RefreshToken.findOneAndDelete({ token: refreshToken });
    }

    // 3. Hapus cookie refreshToken di browser
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout berhasil"
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Logout gagal"
    });
  }
};
