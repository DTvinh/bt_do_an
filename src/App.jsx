// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MenuManager from './components/Manager/MenuManager'
import ProductManager from './components/Manager/ProductManager'
import UserManager from './components/Manager/UserManager'
import OrderNotification from './components/Manager/OrderNotification'
import OrderManager from './components/Manager/OrderManager'
import Login from './components/StorePage/Login'
import Navbar from './components/StorePage/NavBar/NavBar'
import HomePage from './components/StorePage/HomePage/HomePage'
import BrandManager from './components/Manager/brandManager'
import Brand from './components/StorePage/HomePage/Brand'
import DetailProduct from './components/StorePage/HomePage/DetailProduct'
import Cart from './components/StorePage/Cart/Cart'
import Category from './components/StorePage/HomePage/Category'
import Category1 from './components/StorePage/HomePage/Category1'
import Statistics from './components/Manager/Statistics'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/manager' element={<MenuManager />}>

          <Route path='productmanager' element={<ProductManager />} />
          <Route path='usermanager' element={<UserManager />} />
          <Route path='brandmanager' element={<BrandManager />} />
          <Route path='ordernotificationmanager' element={<OrderNotification />} />
          <Route path='ordermanager' element={<OrderManager />} />
          <Route path='statistics' element={<Statistics />} />





        </Route>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Navbar />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/brand/:brandId' element={<Brand />} />
          <Route path='/product/:productId' element={<DetailProduct />} />
          <Route path='/cart/:userId' element={<Cart />} />
          <Route path='/category/:categoryId' element={<Category />} />
          <Route path='/category1/:sex' element={<Category1 />} />


        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
