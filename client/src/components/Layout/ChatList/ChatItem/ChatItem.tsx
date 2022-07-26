import classes from './ChatItem.module.scss'
import { Link } from 'react-router-dom'

interface IChatItem {
  name: string
  username: string
  status: string | null
}

function ChatItem({name, status, username}: IChatItem) {
  return (
    <div className={classes.Wrapper}>
      <Link to={`/chat/${username}`}>
        <div className={classes.ChatItem}>
          <div className={classes.avatar}>
            <img src="https://picsum.photos/100/100" alt="Avatar"/>
          </div>
          <p className={classes.Name}>{name}</p>
          <p className={classes.Status}>{status}</p>
        </div>
      </Link>
    </div>
  )
}

export default ChatItem