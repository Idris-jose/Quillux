 import Homepage from './Home.jsx'
import Sidebar from './sidebar.jsx'
import Create from './Create.jsx'
import Template from './Templates.jsx'
import Analytics from './Analytics.jsx'
import Libary from './Library.jsx'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-10">
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Create" element={<Create/>} />
        <Route path="/Templates" element={<Template />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Library" element={<Libary />} />
        {/* Add more routes here as needed */}
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  )
}

export default App
