import './App.css'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/user/Order'

function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Order />} />
      </Routes>
    </>
  )
}

export default App
