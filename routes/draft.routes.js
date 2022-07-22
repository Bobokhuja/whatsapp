import { Router } from 'express'
import AuthMiddleware from '../middleware/auth.middleware.js'
import { check, validationResult } from 'express-validator'
import UserModel from '../models/User.model.js'
import MessageModel from '../models/Message.model.js'
import DraftModel from '../models/Draft.model.js'

const router = Router()

router.post(
  '/:receiverId',
  [
    check('text', 'Текст не может быть пустым').exists().isLength({min: 1}),
    AuthMiddleware
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Некорректные данные при создании draft'})
      }

      const {text} = req.body
      const {receiverId} = req.params
      const {userId} = req.user

      const findReceiver = await UserModel.getUser({id: receiverId})
      if (!findReceiver) return res.send(404).json('Получатель не существует в базе')

      await DraftModel.setDraft({userId, receiverId, text})
      res.status(201).json({userId, receiverId, text})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

router.get(
  '/',
  AuthMiddleware,
  async (req, res) => {
    const {userId} = req.user
    const drafts = await DraftModel.getDrafts(userId)
    res.json(drafts)
  }
)

router.get(
  '/:receiverId',
  AuthMiddleware,
  async (req, res) => {
    const {receiverId} = req.params
    const {userId} = req.user

    const receiver = await UserModel.getUser({id: receiverId})
    if (!receiver) return res.status(404).json({message: 'Такой пользователь не существует'})

    const draft = await DraftModel.getDraft(userId, receiverId) || null
    res.json(draft)
  }
)

router.delete(
  '/:receiverId',
  AuthMiddleware,
  async (req, res) => {
    const {receiverId} = req.params
    const {userId} = req.user

    const receiver = await UserModel.getUser({id: receiverId})
    if (!receiver) return res.status(404).json({message: 'Такой пользователь не существует'})

    const result = await DraftModel.deleteMessage(userId, receiverId)
    res.status(200).json({deleted: result})
  }
)

export default router