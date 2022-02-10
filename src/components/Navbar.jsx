import React,{useState,useEffect} from "react";
import { Button,Menu,Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons/lib/icons";
import btc_icon from '../btc_icon.svg'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);

      window.addEventListener('resize',handleResize);

      handleResize();

      return () => window.removeEventListener('resize',handleResize)
    }, [])

    useEffect(() => {
      
        if (screenSize<800) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])
    
    

    return (
            <div className="nav-container">
                <div className="logo-container">
                    <Link to="/"> 
                        <img className="logo" src={btc_icon} alt="logo"/>
                    
                        Crypto World
                    </Link> 

                    <Button className="menu-control-container" onClick={()=>setActiveMenu(!activeMenu)}>
                        <MenuOutlined/>

                    </Button>
                </div>

                {activeMenu &&
                    (
                    <Menu theme="dark">
                        <Menu.Item key='home' icon={<HomeOutlined/>}>
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                                
                        <Menu.Item key='cryptocurrencies' icon={<FundOutlined/>}>
                            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                        </Menu.Item>
                            
                        <Menu.Item key='exchanges' icon={<MoneyCollectOutlined/>}>
                            <Link to='/exchanges'>Exchanges</Link>
                        </Menu.Item>
                
                        <Menu.Item key='news' icon={<BulbOutlined/>}>
                            <Link to='/news'>News</Link>
                        </Menu.Item>

                        <Menu.Item key='test' icon={<BulbOutlined/>}>
                            <Link to='/test'>Test</Link>
                        </Menu.Item>
                    </Menu>

                    )

                }
      
            </div>

  )
};

export default Navbar;
