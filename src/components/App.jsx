import Home from './Home.jsx'
import Sidebar from './sidebar.jsx'
import Create from './Create.jsx'
import Template from './Templates.jsx'
import Libary from './Library.jsx'
import Homepage2 from './Homepage.jsx'
import Login from './Auth/Login.jsx'
import SignUp from './Auth/Signup.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no sidebar) */}
        <Route path="/" element={<Homepage2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected routes (with sidebar) */}
        <Route path="/home" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
        <Route path="/create" element={<LayoutWithSidebar><Create /></LayoutWithSidebar>} />
        <Route path="/templates" element={<LayoutWithSidebar><Template /></LayoutWithSidebar>} />
       
        <Route path="/library" element={<LayoutWithSidebar><Libary /></LayoutWithSidebar>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App