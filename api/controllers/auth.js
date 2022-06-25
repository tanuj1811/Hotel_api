import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
    })
    await newUser.save()
    res.status(200).send('user is updated')
  } catch (err) {
    next(err)
  } 
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username:req.body.username })
    if(!user) return next(createError(404, 'user not found!'))

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) return next(createError(400, "Invalid username and password"))

    //key is generated using cmd in terminal :  openssl rand -base64 32
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_TOKEN_KEY)

    const {password, isAdmin, ...otherDetails} = user._doc;

    res.cookie("access_token", token, {
        httpOnly: true, 
    }).status(200).json({...otherDetails})
  } catch (err) {
    next(err)
  }
}
