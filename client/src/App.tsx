import React, { useEffect } from 'react'
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './views/Auth/Auth'
import { useAuth } from './hooks/useAuth'

function App() {
  const isAuthentication = useAuth(null)
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/auth')
  }, [isAuthentication, navigate])

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
