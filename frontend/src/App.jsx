import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Mybooking from './pages/Mybooking.jsx'
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext.jsx';
import Hotel from './pages/Hotel';

const App = () => {
  // ProtectedRoute component to guard routes
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) {
      return <Navigate to="/login" />; 
    }
    
    return children; 
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />

          

          <Route 
            path='/hotels' 
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/mybooking' 
            element={
              <ProtectedRoute>
                <Mybooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/hotels/:id' 
            element={
              <ProtectedRoute>
                <Hotel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
