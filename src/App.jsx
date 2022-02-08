import './App.css'
import React,{useState,useEffect} from "react";
import {Switch,Route,Link} from 'react-router-dom'
import { Layout,Typography, Space } from "antd"

import { Navba,Exchanges,Homepage, Cryptocurrencies,CryptoDetails, News,NotFound,Test } from "./components"


const App = () => {

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This app will render every 10s!');
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);


  return (
      <>
        <div className="app">

          <div className="navbar">
            <Navba/>
          </div>

          <div className="main">
            <Layout>
              <div className="routes">
                <Switch>
                  <Route exact path='/'>
                    <Homepage/>
                  </Route>
                  <Route exact path='/exchanges'>
                    <Exchanges/>
                  </Route>
                  <Route exact path='/cryptocurrencies'>
                    <Cryptocurrencies/>
                  </Route>
                  <Route exact path='/crypto/:coinId'>
                    <CryptoDetails/>
                  </Route>
                  <Route exact path='/news'>
                    <News/>
                  </Route>

                  <Route exact path='/test'>
                    <Test/>
                  </Route>

                  {/* If the routes is not found or other routes */}
                  <Route path="*">
                    <NotFound/>
                  </Route>
                </Switch>
              </div>
            </Layout>

            <div className="footer">
              <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
                Crypto World <br />
                All rights reserved
              </Typography.Title>
              <Space>
                <Link to='/'>Home</Link>
                <Link to='/exchanges'>Exchanges</Link>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                <Link to='/news'>News</Link>
              </Space>
            </div>
            
          </div>
        </div>    
      </>
  )
}

export default App
