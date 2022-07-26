import React, { useEffect } from 'react'
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './views/Auth/Auth'
import { useAuth } from './hooks/useAuth'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchProfile } from './store/profile/profileActions'

function App() {
  const [isAuthentication, setIsAuthenticated] = useAuth()
  const navigate = useNavigate()
  const {userId} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (!isAuthentication) {
      navigate('/auth')
    } else {
      if (userId) {
        dispatch(fetchProfile(userId))
      }
    }
  }, [isAuthentication, navigate])

  if (!isAuthentication) {
    return (
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" />
      </Routes>
    </div>
  );
}

export default App;
