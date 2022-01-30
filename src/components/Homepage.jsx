import React from "react";
import millify from 'millify'
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
// import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptosCoingeckoQuery } from "../services/cryptoApi";



const {Title} = Typography


const Homepage = () => {

  // var {data,isFetching} = useGetCryptosQuery();
  // const dataCoinranking = data
  
  var {data,isFetching}  = useGetCryptosCoingeckoQuery();

  const dataCoingecko = data
  console.log(dataCoingecko)


  const globalStats = dataCoingecko?.data?.stats
  
  const coinList = dataCoingecko
  



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

        <Col span={12}> Exchanges</Col>
        {coinList.map((coin,id)=>(<Col key={coin+id} span={12}>{coin.id}</Col>))}
        
      </Row>
      
      </>
  );
};

export default Homepage;
