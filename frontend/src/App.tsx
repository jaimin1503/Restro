import './App.css'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/user/Order'
import UserNavigation from './pages/user/UserNavigation'

function App() {


  return (
    <>
      <UserNavigation />
      <div className=' max-h-[68vh] top-16 overflow-scroll relative text-textColor'>
        <Routes>
          <Route path="/" element={<Order />} />
        </Routes>
      </div>
    </>
  )
}

export default App
