import {Router} from 'express'
import {check, validationResult} from 'express-validator'
import { createPool } from 'mysql'
import config from 'config'
import UserModel from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const pool = createPool(config.get('db'))

const router = Router()

router.post(
  '/register',
  [
    check('name', 'Неправильное имя').isLength({min: 3, max: 30}),
    check('username', 'Неправильный никнейм').isLength({min: 4, max: 12}),
    check('password', 'Пароль должен иметь минимум 6 символов').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(400).json({
          message: 'Неправильные данные при регистрации',
          errors: errors.array()
        })

      const {name, username, password} = req.body

      const matchUser = await UserModel.getUser({username})
      if (matchUser) return res.status(400).json({message: 'Пользователь с таким никнеймом существует'})

      const hashedPassword = await bcrypt.hash(password, 12)

      await UserModel.insert({name, username, password: hashedPassword})
      const user = await UserModel.getUser({username})

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {
          expiresIn: '1h'
        }
      )

      res.status(201).json({userId: user.id, token})
    } catch(e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

router.post(
  '/login',
  [
    check('username', 'Неправильный никнейм').isLength({min: 4, max: 12}),
    check('password', 'Пароль должен иметь минимум 6 символов').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      console.log(true)
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(400).json({
          message: 'Неправильные данные при входе',
          errors: errors.array()
        })

      const {username, password} = req.body
      const user = await UserModel.getUser({username})
      if (!user) return res.status(400).json({message: 'Неправильный логин или пароль'})

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({message: 'Неправильный логин или пароль'})
      console.log('after isMatch')
      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )
      res.status(201).json({userId: user.id, token})
    } catch(e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

export default router