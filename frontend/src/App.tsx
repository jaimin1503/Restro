import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserNavigation from './pages/user/UserNavigation'
import Menu from './pages/user/Menu'
import Home from './pages/user/Home'
import Cart from './pages/user/Cart'

function App() {


  return (
    <>
      <UserNavigation />
      <div className=' max-h-[68vh] top-16 overflow-scroll relative text-textColor'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </>
  )
}

export default App
