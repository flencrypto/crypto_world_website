import React,{useState} from "react";
import HTMLReactParser from "html-react-parser";
import {useParams} from 'react-router-dom';
import {Col,Row,Typography,Select} from 'antd'
import { DollarCircleOutlined, FundOutlined,SlidersOutlined, ExclamationCircleOutlined, RiseOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetSpecificCoinQuery,useGetCryptoHistoryQuery } from "../apiServices/cryptoApi";
import LineChart from './LineChart';


const {Title,Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  const {coinId} = useParams();
  const [timePeriod, setTimePeriod] = useState('1');
  const {data,isFetching} = useGetSpecificCoinQuery({coinId:coinId},{pollingInterval:30000});
  const cryptoDetails = data?.market_data;
  
  const {data:cryptoHistory} = useGetCryptoHistoryQuery({coinId:coinId,timePeriod:timePeriod});

  console.log(cryptoDetails,cryptoHistory)


  if (isFetching) return 'Loading...'

  const time = [['1d','1'], ['7d','7'],['14d','14'],['30d','30'],['90d','90'],['180d','180'],['1y','365'],['3y','1095'],['5y','1825'],['max','max']];

  const stats = [
    { title: 'Price to USD', 
    value: cryptoDetails?.current_price?.usd ? cryptoDetails?.current_price?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 2}): '?', 
    icon: <DollarCircleOutlined /> },

    { title: 'Price Change Percentage 24h', 
    value: cryptoDetails?.price_change_percentage_24h ? cryptoDetails?.price_change_percentage_24h?.toLocaleString("en-US",{style: "decimal",maximumFractionDigits: 2}) + '%' : '?', 
    icon: <SlidersOutlined /> },

    { title: 'Market Cap', 
    value: cryptoDetails?.market_cap?.usd ? cryptoDetails?.market_cap?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : '?', 
    icon: <FundOutlined /> },

    { title: 'Market Cap Rank', 
    value: cryptoDetails?.market_cap_rank? cryptoDetails?.market_cap_rank : '?', 
    icon: <NumberOutlined /> },

    { title: '24h Trading Volume', 
    value: cryptoDetails?.total_volume?.usd ? cryptoDetails?.total_volume?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0})  : '?', 
    icon: <ThunderboltOutlined /> },

    { title: '24h High / 24h Low', 
    value: (cryptoDetails?.high_24h?.usd ? cryptoDetails?.high_24h?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 2}) : '?') + ' / ' + (cryptoDetails?.low_24h?.usd ? cryptoDetails?.low_24h?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 2}) : '?'), 
    icon: <RiseOutlined /> },

    { title: 'All-time High / All-time Low', 
    value: (cryptoDetails?.ath?.usd ? cryptoDetails?.ath?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 2}) : '?') + ' / ' + (cryptoDetails?.atl?.usd ? cryptoDetails?.atl?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 2}) : '?'), 
    icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    // { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    // { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Max Supply', 
    value: cryptoDetails?.max_supply ? cryptoDetails?.max_supply?.toLocaleString("en-US",{style: "decimal",maximumFractionDigits: 0}) : '?', 
    icon: <ExclamationCircleOutlined /> },

    { title: 'Total Supply', 
    value: cryptoDetails?.total_supply ? cryptoDetails?.total_supply?.toLocaleString("en-US",{style: "decimal",maximumFractionDigits: 0}): '?',
    icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', 
    value: cryptoDetails?.circulating_supply ? cryptoDetails?.circulating_supply?.toLocaleString("en-US",{style: "decimal",maximumFractionDigits: 0}): '?', 
    icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">

      {/* Statistics */}
      <Col className="coin-heading-container">
        <div className="coin-header">
          <img src={data?.image?.small} alt="" />
          <Title level={2} className="coin-name">
            {data?.name} ({data?.symbol?.toUpperCase()})
          </Title>
        </div>
        <p>{data?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Value Statistics</Title>
            <p>An overview showing the statistics of {data?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>

          {stats?.map(({title,value,icon},id)=>(
            <Col key={id} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>


        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading"> Supply Statistics</Title>
            <p>Supply statistics of {data?.name} such as Max, Total, and Circulating Supply</p>
          </Col>

          {genericStats?.map(({title,value,icon},id)=>(
            <Col key={id} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}

        </Col>
      </Col>

      {/* Line chart */}
      <Title className="coin-chart-heading" level={3}> {data?.name} price chart in day(s)</Title> 


      <Select 
        defaultValue={timePeriod} 
        className="select-timeperiod" 
        placeholder='Select Time Period'
        onChange={(value)=>setTimePeriod(value)}>
          {time?.map((day)=> <Option key={day[0]} value={day[1]}>{day[0]}</Option>)}
      </Select>

      <LineChart coinHistory={cryptoHistory} currentPrice={cryptoDetails?.current_price?.usd} coinName={data?.name} />
      



      {/* Description */}

      <Col className="coin-desc-link">
        {/* <Row className="coin-desc"> */}
          <Title level={3} className="coin-details-heading">What is {data?.name}?</Title>
          {(data?.description?.en)?HTMLReactParser(data?.description?.en):'No Description'}
        {/* </Row> */}
        </Col>







    </Col>
  );
};

export default CryptoDetails;