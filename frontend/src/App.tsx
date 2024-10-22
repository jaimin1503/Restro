import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'

function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
