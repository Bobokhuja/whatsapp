import { Router } from 'express'
import AuthMiddleware from '../middleware/auth.middleware.js'
import { check, validationResult } from 'express-validator'
import UserModel from '../models/User.model.js'
import MessageModel from '../models/Message.model.js'

const router = Router()

router.post(
  '/',
  [
    check('message', 'Сообщения не может быть пустым').exists(),
    check('type', 'Тип сообщения неопределенный').isIn(['text', 'file', 'image']),
    check('receiver', 'Некорректный id получателья').exists(),
    AuthMiddleware
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({message: 'Некорректные данные при создании сообщения'})

      const {message, type, receiver} = req.body
      const {userId} = req.user

      const findReceiver = await UserModel.getUser({id: receiver})
      if (!findReceiver) return res.send(404).json('Получатель не существует в базе')

      const formatMessage = {
        message,
        type,
        sender: userId,
        receiver,
        status: 'delivered',
        date: new Date().toLocaleString('zh')
      }
      const id =await MessageModel.add(formatMessage)
      res.status(201).json({status: formatMessage.status, id})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }

  }
)

router.get(
  '/:receiverId',
  [
    AuthMiddleware
  ],
  async (req, res) => {
    try {
      const {receiverId} = req.params
      const {userId} = req.user

      const receiver = await UserModel.getUser({id: receiverId})
      if (!receiver) return res.status(404).json({message: 'Такой пользователь не существует'})

      const messages = await MessageModel.getMessages(userId, receiverId)
      res.json(messages)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

router.delete(
  '/:messageId',
  AuthMiddleware,
  async (req, res) => {
    try {
      if (!req.user) return res.status(401).json({message: 'Нет авторизации'})
      const {messageId} = req.params
      const {userId} = req.user
      const result = await MessageModel.deleteMessage(userId, messageId)
      res.status(200).json({deleted: result})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

export default router