import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IContact } from '../../../models/IContact'
import './Messages.scss'
import HeaderChat from './HeaderChat/HeaderChat'
import FooterChat from './FooterChat/FooterChat'
import { fetchMessages } from '../../../store/message/messageActions'
import MessagesContainer from './MessagesContainer/MessagesContainer'

function Messages() {
  const [chat, setChat] = useState<IContact | null>(null)
  const {receiver} = useParams()
  const {contacts} = useAppSelector(state => state.contact)
  const {token} = useAppSelector(state => state.auth)
  const {messages} = useAppSelector(state => state.message)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const contact = contacts.find(contact => contact.username === receiver)
    if (contact) {
      setChat(contact)

      if (token) dispatch(fetchMessages({token, receiverId: contact.id}))

    }
  }, [receiver, contacts])

  if (!chat) {
    return (
      <div className="Messages">
        <p className="Messages__head">Select Chat</p>
      </div>
    )
  }

  return (
    <div className="Messages">
      <HeaderChat name={chat.name} status={chat.status} />
      <MessagesContainer />
      <FooterChat receiver={chat.id} />
    </div>
  )
}

export default Messages