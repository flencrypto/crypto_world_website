import React from "react";
import millify from 'millify'
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptosCoingeckoQuery } from "../services/cryptoApi";


import { Cryptocurrencies,News } from ".";

const {Title} = Typography



const Homepage = () => {

  var {data,isFetching} = useGetCryptosQuery();
  const globalStats = data?.data?.stats



  if (isFetching) return 'Loading...'
 

  return (
      <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?globalStats.total:'No data'}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={globalStats?globalStats.totalExchanges:'No data'}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={globalStats?millify(globalStats.totalMarketCap):'No data'}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={globalStats?millify(globalStats.total24hVolume):'No data'}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={globalStats?globalStats.totalMarkets:'No data'}/></Col>
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
