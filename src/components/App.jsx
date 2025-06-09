import Home from './Home.jsx'
import Sidebar from './sidebar.jsx'
import Create from './Create.jsx'
import Template from './Templates.jsx'
import Analytics from './Analytics.jsx'
import Libary from './Library.jsx'
import Homepage2 from './Homepage.jsx'
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
  const location = useLocation()
  if (location.pathname === "/") {
    return (
      <Routes>
        <Route path="/" element={<Homepage2 />} />
      </Routes>
    )
  }
  return (
    <LayoutWithSidebar>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Templates" element={<Template />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Library" element={<Libary />} />
     
      </Routes>
    </LayoutWithSidebar>
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
