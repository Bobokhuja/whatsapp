import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './views/Auth/Auth'
import { useAuth } from './hooks/useAuth'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchProfile } from './store/profile/profileActions'
import { addContact, deleteContact, fetchContacts } from './store/contact/contactActions'
import { fetchMessages } from './store/message/messageActions'
import NotFound from './views/NotFound/NotFound'
import Layout from './components/Layout/Layout'

function App() {
  const [isAuthentication, setIsAuthenticated] = useAuth()
  const navigate = useNavigate()
  const {userId, token} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()


  useEffect(() => {

    if (userId && token) {
      dispatch(fetchProfile(userId))
      dispatch(fetchContacts(token))
      // dispatch(addContact({token, contactId: 3}))
      // dispatch(fetchMessages({token, receiverId: 6}))
    }
  }, [isAuthentication, navigate])

  if (!isAuthentication) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth/>}/>
        </Routes>
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="chat/:receiver" element={<></>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
