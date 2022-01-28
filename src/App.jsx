import { useState } from 'react'
import './App.css'
import {Switch,Route,Link} from 'react-router-dom'
import { Layout,Typography, Space } from "antd"
import btc_icon from './btc_icon.svg'
const App = () => {

  return (
      <>
        <div className="App">

          <div className="App-navbar">
            <div className="Logo-section">
              <div><img className="App-logo" src={btc_icon} alt="logo"/></div>
              <div>Crypto World</div>
            </div>
            
            <div>Home</div> 
            <div>Cryptocurrencies </div> 
            <div>Exchanges</div> 
            <div>News</div> 
            <div>Fear & Greed Index </div> 
          </div>

          <div className="App-main">
            <h1>Content</h1>
          </div>

          <div className="App-footer">

          </div>
          
        </div>    
      </>
  )
}

export default App
