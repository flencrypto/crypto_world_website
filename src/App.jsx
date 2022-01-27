import { useState } from 'react'
import './App.css'
import btc_icon from './btc_icon.svg'

function App() {

  return (
      <>
        <div className="App">

          <div className="App-header">
            <div className="Logo-section">
              <div><img className="App-logo" src={btc_icon} alt="logo"/></div>
              <div>Crypto World</div>
            </div>
            <div>Home</div> 
            <div>Exchange </div> 
            <div>News</div> 
            <div>Fear & Greed Index </div> 
          </div>

          <div>
            <h1>Content</h1>
          </div>
          
        </div>    
      </>
  )
}

export default App
