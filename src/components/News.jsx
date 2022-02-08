import React,{useState} from "react";
import {Typography, Row,Col,Avatar,Card} from 'antd';
import moment from "moment";
import { useGetNewsQuery } from "../apiServices/newsApi";
import Autocomplete from './Autocomplete';

const {Text,Title} = Typography
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const onPage = 'News';
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const page_size = simplified ? 6 : 25;

  const {data:cryptoNews,isFetching} = useGetNewsQuery({newsCategory:newsCategory,page_size:page_size},{pollingInterval:300000})
  // console.log(cryptoNews)

  if (isFetching) return 'Loading'

  return (
    <>
      {!simplified&& (
        <>
        
        <div className="search-crypto">
              <h1>Latest Crypto News</h1>
            <Autocomplete onPage={onPage} setNewsCategory={setNewsCategory}></Autocomplete>

          </div>
        </>
      )}

      <Row gutter={[24,24]}>
          {cryptoNews?.articles?.length > 0 ? 
            (   
              cryptoNews?.articles?.map((news,i)=>(
                    <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                          <a href={news?.link} target="blank" rel="noreferrer">
                            <div className="news-image-container">
                              <Title className="news-title" level={4}>{news?.title}</Title>
                              <img src={news?.media || demoImage} alt="" />
                            </div> 
                            <p>
                              {news?.summary?.length >100? `${news?.summary?.substring(0,100)}...`: news?.summary || ''}
                            </p>
                            <div className="provider-container">
                              <div>
                                {/* <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/> */}
                                <Text>{news?.authors[0] || ''}</Text>
                              </div>

                                <Text>{news?.published_date || ''}</Text>
                    
                                {/* <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text> */}
                            </div>
                            
                          </a> 
                    </Card>
                    </Col>      
                  ))
            ) : (
                <h1 className="no-news">Sorry! No news found.</h1>
            )

          }
          
        
      </Row>
    </>
  );
};

export default News;
