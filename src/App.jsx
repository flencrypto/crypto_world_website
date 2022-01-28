import { useState } from 'react'
import './App.css'
import {Switch,Route,Link} from 'react-router-dom'
import { Layout,Typography, Space } from "antd"

import { Navbar } from "./components"


const App = () => {

  return (
      <>
        <div className="app">

          <div className="navbar">
            <Navbar/>
          </div>

          <div className="main">
            <h1>Content</h1>
          </div>

          <div className="footer">
            <p>Footer</p>
          </div>
          
        </div>    
      </>
  )
}

export default App
