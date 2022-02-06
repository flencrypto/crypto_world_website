import React from "react";
import millify from 'millify'
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery,useGetGlobalStatCoingeckoQuery } from "../services/cryptoApi";
// import { useGetCryptosCoingeckoQuery } from "../services/cryptoApi";


import { Cryptocurrencies,News } from ".";

const {Title} = Typography



const Homepage = () => {

  // const {data,isFetching} = useGetCryptosQuery();
  // const globalStats = data?.data?.stats

  const {data:globalStats,isFetching} = useGetGlobalStatCoingeckoQuery();

  console.log(globalStats?.data)

  if (isFetching) return 'Loading...'
 

  return (
      <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={(globalStats?.data)?globalStats?.data?.active_cryptocurrencies:'No data'}/></Col>
        <Col span={12}> Dominance: BTC {(globalStats?.data)?globalStats?.data?.market_cap_percentage?.btc.toLocaleString("en-US",{maximumFractionDigits: 2})+'%':'No data'} ETH {(globalStats?.data)?globalStats?.data?.market_cap_percentage?.eth.toLocaleString("en-US",{maximumFractionDigits: 2})+'%':'No data'}
          
          {/* <Statistic title={`Dominance: BTC`}value={(globalStats?.data)?globalStats?.data?.market_cap_percentage?.btc:'No data'}/> */}
          
          
          </Col>
        <Col span={12}><Statistic title={`Total Market Cap`}
                          value={globalStats?(globalStats?.data?.total_market_cap?.usd).toLocaleString("en-US",{style: "currency",currency: "usd"}):'No data'}/>
        </Col>
        <Col span={12}><Statistic title="Total 24h Volume" 
                          value={globalStats?(globalStats?.data?.total_volume?.usd).toLocaleString("en-US",{style: "currency",currency: "usd"}):'No data'}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={globalStats?globalStats?.data?.markets:'No data'}/></Col>
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
