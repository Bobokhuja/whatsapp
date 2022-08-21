import express from 'express'
import config from 'config'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import { createPool } from 'mysql'
import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import messageRoutes from './routes/message.routes.js'
import draftRoutes from './routes/draft.routes.js'
import {Socket} from 'socket.io'

const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/draft', draftRoutes)

const PORT = 5000


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

Socket.on('connection',(socket)=>{
  // Обработка операции
})