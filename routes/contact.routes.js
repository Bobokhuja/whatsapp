import { Router } from 'express'
import UserModel from '../models/User.model.js'
import { check, validationResult } from 'express-validator'
import AuthMiddleware from '../middleware/auth.middleware.js'
import ContactModel from '../models/Contact.model.js'

const router = Router()

router.get(
  '/',
  AuthMiddleware,
  async (req, res) => {
    try {
      const {userId} = req.user
      const contacts = await ContactModel.getContacts(userId)

      const contactsFormat = await Promise.all(contacts.map(async contact => {
        const findContact = await UserModel.getUser({id: contact.contact})
        return {
          date: contact.date,
          contact: {
            id: findContact.id,
            name: findContact.name,
            status: findContact.status,
            username: findContact.username
          }
        }
      }))
      res.json(contactsFormat)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

router.get(
  '/:contactId',
  AuthMiddleware,
  async (req, res) => {
    try {
      if (!req.user) return res.status(401).json({message: 'Нет авторизации'})

      const {userId} = req.user
      const contact = await ContactModel.getContact(userId, req.params.contactId)
      if (!contact) return res.status(404).json({message: 'Нет такого контакта'})

      const findContact = await UserModel.getUser({id: contact.contact})

      res.json({
        id: findContact.id,
        name: findContact.name,
        username: findContact.username,
        status: findContact.status
      })
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

router.delete(
  '/:contactId',
  AuthMiddleware,
  async (req, res) => {
    try {
      const {contactId} = req.params
      const {userId} = req.user
      const user = await UserModel.getUser({id: contactId})
      if (!user) return res.status(404).json({message: 'Контакт не существует'})

      const contact = await ContactModel.getContact(userId, contactId)
      if (!contact) return res.status(404).json({message: 'У вас такого контакта нет'})
      const result = await ContactModel.delete(userId, contactId)
      res.json({deleted: result})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

router.post(
  '/',
  [
    check('contactId', 'Неправильное имя').isNumeric(),
    AuthMiddleware
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(400).json({
          message: 'Контакт не выбран',
          errors: errors.array()
        })
      const {contactId} = req.body
      const {userId} = req.user

      const matchContact = await ContactModel.getContact(userId, contactId)
      if (matchContact) return res.status(400).json({message: 'Контакт уже добавлен'})
      await ContactModel.insert(userId, contactId)
      res.status(201).json({contactId})
    } catch(e) {
      res.status(500).json({message: 'Что-то пошло не так'})
      console.log(e)
    }
  }
)

export default router