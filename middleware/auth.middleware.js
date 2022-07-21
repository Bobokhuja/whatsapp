import jwt from 'jsonwebtoken'
import config from 'config'
import UserModel from '../models/User.model.js'

export default function (req, res, next) {
  if (req.method === 'OPTIONS') return next()
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) return res.status(401).json({message: 'Нет авторизации'})

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    const findUser = UserModel.getUser({id: decoded.userId})
    if (!findUser) return res.status(401).json({message: 'Нет авторизации'})
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({message: 'Нет авторизации'})
  }
}