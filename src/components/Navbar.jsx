import React from "react";
import { Button,Menu,Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons/lib/icons";
import btc_icon from '../btc_icon.svg'

const Navbar = () => {
  return (
            <div className="navbar-container">
                <div className="logo-container">
                    <img className="app-logo" src={btc_icon} alt="logo"/>
                    
                    <Link to="/"> Crypto World</Link> 
                    
                    {/* <Button className="menu-control-container"></Button> */}
                </div>

                <div>Home</div> 
                <div>Cryptocurrencies </div> 
                <div>Exchanges</div> 
                <div>News</div> 
                <div>Fear & Greed Index </div> 
                
            </div>

  )
};

export default Navbar;
