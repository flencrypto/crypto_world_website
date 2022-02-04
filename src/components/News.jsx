import React,{useState} from "react";
import {Typography, Row,Col,Avatar,Card} from 'antd';
import moment from "moment";
import { useGetNewsQuery } from "../services/newsApi";
import AutoCompleteComp from './AutoCompleteComp'

const {Text,Title} = Typography
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const onPage = 'News';
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const count = simplified?6:12;

  const {data:cryptoNews,isFetching} = useGetNewsQuery({newsCategory:'Cryptocurrency',count:count})

  if (isFetching) return 'Loading'
  

  return (
    <>
    {!simplified&& (
      <>
      
      <div className="search-crypto">
            <h1>Latest Crypto News</h1>
           <AutoCompleteComp onPage={onPage} setNewsCategory={setNewsCategory}></AutoCompleteComp>

         </div>
      </>
    )}

    <Row gutter={[24,24]}>
          {cryptoNews?.value?.map((news,i)=>(
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                   <a href={news?.url} target="blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Title className="news-title" level={4}>{news?.name}</Title>
                        <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                      </div> 
                      <p>
                        {news?.description >100? `${news?.description?.substring(0,100)}...`: news.description || ''}
                      </p>
                      <div className="provider-container">
                        <div>
                          <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                          <Text>{news?.provider[0]?.name}</Text>
                        </div>

                          <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                      </div>
                      
                    </a> 
              </Card>
            </Col>
          ))}
    </Row>
    </>
  );
};

export default News;