import {Router} from 'express'
import UserModel from '../models/User.model.js'
import {check, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'
import AuthMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    if (req.query.hasOwnProperty('findUsers')) {
      const users = await UserModel.getUsers(req.query.findUsers)
      return res.json(users.map(user => ({id: user.id, name: user.name, username: user.username, status: user.status})))
    }
    const user = await UserModel.getUser(req.query)
    if (!user) return res.status(404).json({message: 'Нет такой пользователь'})

    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      status: user.status
    })
  } catch(e) {
    console.log(e)
    res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.delete(
  '/',
  [
    check('password', 'Неправильный пароль').isLength({min: 6}),
    AuthMiddleware
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({message: 'Неправильный пароль'})

    const {password} = req.body
    const {userId} = req.user

    const user = await UserModel.getUser({id: userId})
    if (!user) return res.status(404).json({message: 'Нет такой пользователь'})
    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({message: 'Неправильный пароль'})

    await UserModel.deleteUser(userId)
    res.json({deleted: true})
  } catch(e) {
    res.status(500).json({message: 'Что-то пошло не так'})
    console.log(e)
  }
})

router.patch(
  '/status',
  [
    check('status', 'Неправильный статус').isIn(['offline', 'online']),
    AuthMiddleware
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({message: 'Неправильный статус'})

      const {status} = req.body
      const {userId} = req.user

      await UserModel.changeStatus(userId, status)

      res.json({status})
    } catch(e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  })

export default router