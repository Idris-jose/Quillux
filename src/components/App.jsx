import Home from './Home.jsx'
import Sidebar from './sidebar.jsx'
import Create from './Create.jsx'
import Template from './Templates.jsx'
import Libary from './Library.jsx'
import Homepage2 from './Homepage.jsx'
import Login from './Auth/Login.jsx'
import SignUp from './Auth/Signup.jsx'
import {AuthProvider } from './Auth/AuthContext.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import PublicRoute from './Routes/PublicRoute.jsx';
function LayoutWithSidebar({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-10">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes (no sidebar) */}
          <Route path="/" element={<Homepage2 />} />
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
      
         {/* Protected routes (with sidebar) */}
        <Route path="/home" element={
          <ProtectedRoute>
            <LayoutWithSidebar><Home /></LayoutWithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <LayoutWithSidebar><Create /></LayoutWithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/templates" element={
          <ProtectedRoute>
            <LayoutWithSidebar><Template /></LayoutWithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/library" element={
          <ProtectedRoute>
            <LayoutWithSidebar><Libary /></LayoutWithSidebar>
          </ProtectedRoute>
        } />
        
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
}
