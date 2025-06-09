import Home from './Home.jsx'
import Sidebar from './sidebar.jsx'
import Create from './Create.jsx'
import Template from './Templates.jsx'
import Analytics from './Analytics.jsx'
import Libary from './Library.jsx'
import Homepage2 from './Homepage.jsx'
import Login from './Auth/Login.jsx'
import SignUp from './Auth/Signup.jsx'
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'

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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        element={
          <LayoutWithSidebar>
            {/* Nested routes will render inside the sidebar layout */}
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/templates" element={<Template />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/library" element={<Libary />} />
            </Routes>
          </LayoutWithSidebar>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
