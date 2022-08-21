import classes from './AddContact.module.scss'
import Search from '../../Layout/Search/Search'
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useState } from 'react'
import Input from '../../form/Input/Input'
import { IContact } from '../../../models/IContact'
import { serverApi } from '../../../utils/constants/server'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { addContact } from '../../../store/contact/contactActions'

interface IAddContact {
  setIsShowContact: (isShow: boolean) => void
}

function AddContact({setIsShowContact}: IAddContact) {
  const [text, setText] = useState<string>('')
  const [users, setUsers] = useState<IContact[]>([])
  const dispatch = useAppDispatch()
  const {token, userId} = useAppSelector(state => state.auth)
  const {contacts} = useAppSelector(state => state.contact)

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setText(event.target.value)
    fetch(`${serverApi}/user/?findUsers=${event.target.value}`)
      .then(response => response.json())
      .then(users => {
        setUsers(users.filter((user: IContact) =>
          !contacts.find(contact => contact.id === user.id)
          && user.id !== userId
        ))
      })
  }

  const onAddContact = (id: number) => {
    if (token) {
      dispatch(addContact({token, contactId: id}))
      setUsers([
        ...users.filter(user => user.id !== id)
      ])
    }
  }

  return (
    <div className={classes.AddContact}>
      <button className={classes.Close} onClick={() => setIsShowContact(false)}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <Input
        type="text"
        name="username"
        value={text}
        placeholder="Username"
        onChange={onChangeHandler}
      />
      <ul className={classes.List}>
        {users.map(user =>
          <li key={user.id}>
            <p>
              <span className={classes.Name}>{user.name}</span>
              <span className={classes.Username}>{user.username}</span>
            </p>
            <button className={classes.Add} onClick={() => onAddContact(user.id)}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AddContact