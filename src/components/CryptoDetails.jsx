import React,{useState} from "react";
import HTMLReactParser from "html-react-parser";
import {useParams} from 'react-router-dom';
import millify from 'millify';
import {Col,Row,Typography,Select} from 'antd'
import { DollarCircleOutlined, FundOutlined,SlidersOutlined, ExclamationCircleOutlined, RiseOutlined,FallOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined,QuestionOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { useGetSpecificCoinQuery } from "../apiServices/cryptoApi";

const {Title,Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  const {coinId} = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const {data,isFetching} = useGetSpecificCoinQuery({coinId:coinId},{pollingInterval:30000});
  const cryptoDetails = data?.market_data;
  console.log({cryptoDetails,data})


  if (isFetching) return 'Loading...'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Market Cap Rank', 
    value: cryptoDetails?.market_cap_rank? cryptoDetails?.market_cap_rank : <QuestionOutlined/>, 
    icon: <NumberOutlined /> },

    { title: 'Price to USD', 
    value: cryptoDetails?.current_price?.usd ? cryptoDetails?.current_price?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 2}):<QuestionOutlined/>, 
    icon: <DollarCircleOutlined /> },

    { title: 'Price Change Percentage 24h', 
    value: cryptoDetails?.price_change_percentage_24h ? cryptoDetails?.price_change_percentage_24h?.toLocaleString("en-US",{style: "decimal",maximumFractionDigits: 2}) + '%' : <QuestionOutlined/>, 
    icon: <SlidersOutlined /> },


    { title: '24h Volume', 
    value: cryptoDetails?.total_volume?.usd ? cryptoDetails?.total_volume?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0})  : <QuestionOutlined/>, 
    icon: <ThunderboltOutlined /> },

    { title: 'Market Cap', 
    value: cryptoDetails?.market_cap?.usd ? cryptoDetails?.market_cap?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : <QuestionOutlined/>, 
    icon: <FundOutlined /> },

    { title: '24h High', 
    value: cryptoDetails?.high_24h?.usd ? cryptoDetails?.high_24h?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : <QuestionOutlined/>, 
    icon: <RiseOutlined /> },

    { title: '24h Low', 
    value: cryptoDetails?.low_24h?.usd ? cryptoDetails?.low_24h?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : <QuestionOutlined/>, 
    icon: <FallOutlined /> },

    { title: 'All-time High', 
    value: cryptoDetails?.ath?.usd ? cryptoDetails?.ath?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : <QuestionOutlined/>, 
    icon: <TrophyOutlined /> },

    { title: 'All-time Low', 
    value: cryptoDetails?.atl?.usd ? cryptoDetails?.atl?.usd?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : <QuestionOutlined/>, 
    icon: <VerticalAlignBottomOutlined /> },
  ];

  const genericStats = [
    // { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    // { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Max Supply', value: cryptoDetails?.max_supply ? cryptoDetails?.max_supply?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}) : <QuestionOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: cryptoDetails?.total_supply ? cryptoDetails?.total_supply?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}): <QuestionOutlined/>, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: cryptoDetails?.circulating_supply ? cryptoDetails?.circulating_supply?.toLocaleString("en-US",{style: "currency",currency: "usd",maximumFractionDigits: 0}):<QuestionOutlined/>, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.name} ({data?.symbol?.toUpperCase()}) Price
        </Title>
        <p>{data?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select 
        defaultValue='7d' 
        className="select-timeperiod" 
        placeholder='Select Time Period'
        onChange={(value)=>setTimePeriod(value)}>
          {time?.map((date)=> <Option key={date} value={date}/>)}
      </Select>
      {/* Line chart */}

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{data?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {data?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>

          {stats?.map(({title,value,icon})=>(
            <Col className="coin-stats">
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
            <Title level={3} className="coin-details-heading">{data?.name} Supply Statistics</Title>
            <p>Supply statistics of {data?.name} such as Max, Total, and Circulating Supply</p>
          </Col>

          {genericStats?.map(({title,value,icon})=>(
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}


        </Col>
      </Col>








    </Col>
  );
};

export default CryptoDetails;