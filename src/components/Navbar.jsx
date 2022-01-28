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
                
                <Menu>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                </Menu>

                <Menu>
                    <Menu.Item icon={<FundOutlined/>}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                </Menu>

                <Menu>
                    <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                </Menu>

                <Menu>
                    <Menu.Item icon={<BulbOutlined/>}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>

                {/* <div>Home</div> 
                <div>Cryptocurrencies </div> 
                <div>Exchanges</div> 
                <div>News</div> 
                <div>Fear & Greed Index </div>  */}
                
            </div>

  )
};

export default Navbar;
