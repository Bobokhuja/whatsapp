import classes from './FooterChat.module.scss'
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { sendMessage } from '../../../../store/message/messageActions'

function FooterChat({receiver}: {receiver: number}) {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()
  const {token, userId} = useAppSelector(state => state.auth)

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setText(event.target.value)
  }

  const onSendMessageKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      onSendMessage()
    }
  }

  const onSendMessage = () => {
    if (token && userId) {
      dispatch(sendMessage({
        token,
        message: {
          message: text,
          receiver,
          type: 'text',
          sender: userId
        }
      }))
      setText('')
    }
  }

  return (
    <div className={classes.FooterChat}>
      <div className={classes.InputMessage}>
        <input
          type="text"
          placeholder="Input Message"
          value={text}
          onChange={onChangeHandler}
          onKeyDown={onSendMessageKeyDown}
        />
      </div>
      <button
        type="button"
        className={classes.Send}
        disabled={!text.trim()}
        onClick={onSendMessage}
      >
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  )
}

export default FooterChat