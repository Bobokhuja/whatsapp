import React, { useEffect } from 'react'
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './views/Auth/Auth'
import { useAuth } from './hooks/useAuth'

function App() {
  const [isAuthentication, setIsAuthenticated] = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    if (!isAuthentication) {
      navigate('/auth')
    }
    console.log(isAuthentication)
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
