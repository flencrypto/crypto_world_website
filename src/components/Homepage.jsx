import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetGlobalStatCoingeckoQuery } from "../services/cryptoApi";
// import { useGetCryptosCoingeckoQuery } from "../services/cryptoApi";


import { Cryptocurrencies,News } from ".";

const {Title} = Typography



const Homepage = () => {


  const {data:globalStats,isFetching} = useGetGlobalStatCoingeckoQuery();

  const globalData = globalStats?.data

  // console.log(globalStats?.data)

  if (isFetching) return 'Loading...'
 

  return (
      <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row className="stat">
        <Col span={12}>
          <Statistic  title= {'Total Cryptocurrencies'} value={(globalData)?globalData?.active_cryptocurrencies:'No data'}/>
        </Col>

        <Col span={12}> 
           <Statistic title={`Market Dominance`} value={(globalData)?'BTC: ' + globalData?.market_cap_percentage?.btc?.toLocaleString("en-US",{maximumFractionDigits: 2})+'% - ETH: ' + globalData?.market_cap_percentage?.eth?.toLocaleString("en-US",{maximumFractionDigits: 2}) + '%' :'No data'}/> 
        </Col>
        <Col span={12}><Statistic title={`Total Market Cap`}
                          value={globalData?(globalData?.total_market_cap?.usd).toLocaleString("en-US",{style: "currency",currency: "usd"}):'No data'}/>
        </Col>
        <Col span={12}><Statistic title="Total 24h Volume" 
                          value={globalData?(globalData?.total_volume?.usd).toLocaleString("en-US",{style: "currency",currency: "usd"}):'No data'}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={globalStats?globalData?.markets:'No data'}/></Col>

        <Col span={12}> 
           <Statistic title={`Initial Coin Offering (ICO)`} value={(globalData)?'Ongoing: ' + globalData?.ongoing_icos + ' - Ended: ' + globalData?.ended_icos :'No data'}/> 
          </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>

        <Title level={3} className="show-more">
          <Link to='/cryptocurrencies'>Show more</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified/>



      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>

        <Title level={3} className="show-more">
          <Link to='/news'>Show more</Link>
        </Title>
      </div>

      <News simplified/>
      
      </>
  );
};

export default Homepage;
