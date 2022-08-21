import classes from './MessagesContainer.module.scss'
import { useAppSelector } from '../../../../hooks/redux'
import Message from './Message/Message'

function MessagesContainer() {
  const {messages} = useAppSelector(state => state.message)
  return (
    <div className={classes.MessagesContainer}>
      {
        messages.map(message =>
          <Message key={message.id} message={message} />
        )
      }
    </div>
  )
}

export default MessagesContainer