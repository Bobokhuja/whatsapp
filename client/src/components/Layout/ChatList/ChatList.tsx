import classes from './ChatList.module.scss'
import { useAppSelector } from '../../../hooks/redux'
import ChatItem from './ChatItem/ChatItem'

function ChatList({}) {
  const {contacts} = useAppSelector(state => state.contact)
  return (
    <div className={classes.ChatList}>
      {contacts.map(contact =>
        <ChatItem
          key={contact.id}
          username={contact.username}
          name={contact.name}
          status={contact.status}
        />)}
    </div>
  )
}

export default ChatList