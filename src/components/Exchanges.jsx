import React,{useState} from "react";
import {useGetExchangesCoingeckoQuery,useGetSpecificCoinQuery} from "../apiServices/cryptoApi"
import { Table } from "antd";

const Exchanges = () => {
  const [coinId,setCoinId] = useState('bitcoin')
  const {data:exchanges,isFetching} = useGetExchangesCoingeckoQuery({pollingInterval:30000});
  const {data:specificCoin}= useGetSpecificCoinQuery({coinId:coinId})

  console.log(exchanges)
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
    
    info: (exchange?.country || exchange?.description || exchange?.has_trading_incentive)? 
                                <> 
                                  <b>Founded Country:</b> {exchange?.country} <br /> 
                                  <b>Has Trading Incentive:</b> {exchange?.has_trading_incentive?.toLocaleString() ? (exchange?.has_trading_incentive?.toLocaleString() === 'false'?'No':'Yes') : 'N/A'} <br />
                                  <b>Description:</b> {exchange?.description?exchange?.description:'No description'} <br />
                                  
                                  
                                </>               
                              :'No information',
  })) 

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key:'rank',
      fixed:'left',
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
      fixed:'right',
    },
  ]

  if (isFetching) return "Loading..."


  return (
    <>
    <div>
      <h1>Top 100 Cryptocurrency Exchanges Ranking by Trust Score </h1>
    </div>

    <Table 
      dataSource={exchangesTableData} 
      columns={columns} 
      pagination={false} 
      scroll={{ x: 800, y: 1500 }}
      expandable={{expandedRowRender: record => <p style={{ margin: 0 }}>{record.info}</p>,}} />
    </>

  );
};

export default Exchanges;
