import React,{useState} from "react";
import {useGetExchangesCoingeckoQuery,useGetSpecificCoinQuery} from '../services/cryptoApi'
import { Table } from "antd";

const Exchanges = () => {
  const [coinId,setCoinId] = useState('bitcoin')
  const {data:exchanges,isFetching} = useGetExchangesCoingeckoQuery();
  const {data:specificCoin}= useGetSpecificCoinQuery({id:coinId})

  // (exchanges&&console.log(exchanges))
  const btc_price = specificCoin?.market_data?.current_price?.usd


  //Exchanges table 
  const exchangesTableData = []

  exchanges?.map((exchange,index)=> exchangesTableData.push({
    key:index,
    rank:exchange?.trust_score_rank,
    name: <><img alt='' className="crypto-image" src={exchange?.image}/> {exchange?.name}</>,
    trust_score: exchange?.trust_score,
    trade_volume_24h_btc: (exchange?.trade_volume_24h_btc * btc_price).toLocaleString("en-US",{style: "currency",currency: "usd"}),
    year_established: (exchange?.year_established)?exchange?.year_established:"No data",
    website: (exchange?.url)?<a href={exchange?.url} target="_blank" rel="noopener noreferrer">
                                {exchange?.name}
                            </a>:"No data",
  })) 

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key:'rank',
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trust Score',
      dataIndex: 'trust_score',
      key: 'trust_score',
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: '24h Trading Volume',
      dataIndex: 'trade_volume_24h_btc',
      key: 'trade_volume_24h_btc',
      sorter: (a, b) => Number(a.trade_volume_24h_btc.replace(/[$,]/g, '')) - Number(b.trade_volume_24h_btc.replace(/[$,]/g, '')) 
    },
    {
      title: 'Year Established',
      dataIndex: 'year_established',
      key: 'year_established',
      sorter: (a, b) => a.year_established - b.year_established,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
  ]

  if (isFetching) return "Loading..."


  return (
    <>
    <div>
      <h1>Top 100 Cryptocurrency Exchanges Ranking by Trust Score </h1>
    </div>

    <Table dataSource={exchangesTableData} columns={columns} pagination={false} />
    </>

  );
};

export default Exchanges;
