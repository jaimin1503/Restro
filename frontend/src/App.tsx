import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserNavigation from './pages/user/UserNavigation'
import Menu from './pages/user/Menu'
import Home from './pages/user/Home'
import Cart from './pages/user/Cart'
import Search from './pages/user/Search'
import Profile from './pages/user/Profile'

function App() {


  return (
    <>
      <UserNavigation />
      <div className=' max-h-[68vh] top-16 overflow-scroll relative text-textColor'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
