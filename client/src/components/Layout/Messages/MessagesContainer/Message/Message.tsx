import classes from './Message.module.scss'
import { IMessage } from '../../../../../models/IMessage'
import { useAppSelector } from '../../../../../hooks/redux'

function Message({message}: {message: IMessage}) {
  const {userId} = useAppSelector(state => state.auth)

  const cls = [
    classes.Message,
    classes[userId === message.sender ? 'Your' : 'Participant']
  ]
  // console.log(new Date(message.date))

  let time: string | Date = new Date(message.date)
  time = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`

  return (
    <div className={cls.join(' ')}>
      {message.message}
      <span className={classes.Date}>{time}</span>
    </div>
  )
}

export default Message