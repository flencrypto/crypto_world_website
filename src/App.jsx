import { useState } from 'react'
import './App.css'
import {Switch,Route,Link} from 'react-router-dom'
import { Layout,Typography, Space } from "antd"

import { Navbar } from "./components"


const App = () => {

  return (
      <>
        <div className="App">

          <div className="App-navbar">
            <Navbar/>
          </div>

          <div className="App-main">
            <h1>Content</h1>
          </div>

          <div className="App-footer">
            <p>Footer</p>
          </div>
          
        </div>    
      </>
  )
}

export default App
