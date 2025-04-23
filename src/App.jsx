import { useState } from 'react'
import './App.css'
import {Routes, Route } from "react-router";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
