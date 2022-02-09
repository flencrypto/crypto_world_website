import React,{useState} from "react";
import HTMLReactParser from "html-react-parser";
import {useParams} from 'react-router-dom';
import millify from 'millify';
import {Col,Row,Typography,Select} from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetSpecificCoinQuery } from "../apiServices/cryptoApi";

const {Title,Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  const {coinId} = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const {data,isFetching} = useGetSpecificCoinQuery({coinId:coinId},{pollingInterval:30000});
  const cryptoDetails = data?.market_data;
  console.log(cryptoDetails)


  if (isFetching) return 'Loading...'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `${cryptoDetails?.current_price?.usd ? '$' + cryptoDetails?.current_price?.usd:'No data'}`, icon: <DollarCircleOutlined /> },
    { title: 'Market Cap Rank', value: cryptoDetails?.market_cap_rank? cryptoDetails?.market_cap_rank : 'No data' , icon: <NumberOutlined /> },
    { title: '24h Volume', value: `${cryptoDetails?.total_volume ? '$' + cryptoDetails?.total_volume  : 'No data'}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `${cryptoDetails?.market_cap ? '$' +  cryptoDetails?.market_cap : 'No data'}`, icon: <DollarCircleOutlined /> },
    { title: '24h High', value: `${cryptoDetails?.high_24h?.usd ? '$' +  cryptoDetails?.high_24h?.usd : 'No data'}`, icon: <MoneyCollectOutlined /> },
    { title: 'Price Change Percentage 24h', value: ` ${cryptoDetails?.price_change_percentage_24h ? cryptoDetails?.price_change_percentage_24h + '%' : 'No data'}`, icon: <TrophyOutlined /> },
    { title: 'All-time High', value: `${cryptoDetails?.ath?.usd ? '$' + cryptoDetails?.ath?.usd : 'No data'}`, icon: <FundOutlined /> },
    { title: 'All-time Low', value: `$ ${cryptoDetails?.atl?.usd ? '$' + cryptoDetails?.atl?.usd : 'No data'}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    // { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    // { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Max Supply', value: `${cryptoDetails?.max_supply ? <CheckOutlined /> : <StopOutlined />}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `${cryptoDetails?.total_supply ? cryptoDetails?.total_supply: 'No data'}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `${cryptoDetails?.circulating_supply ? cryptoDetails?.circulating_supply:'No data'}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
      <div>CryptoDetails {coinId}

      </div>
  );
};

export default CryptoDetails;