import React,{useState,useEffect} from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card,Row,Col, Input } from "antd";

import { useGetCryptosCoingeckoQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {

  const per_page = simplified ? 10 :20;

  const page = simplified && 1;

  console.log(page,per_page)

  const {data:cryptoListCoingecko, isFetching} = useGetCryptosCoingeckoQuery({page,per_page});
  
  console.log(cryptoListCoingecko)

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setCryptos(cryptoListCoingecko)

    const filteredData = cryptoListCoingecko?.filter((coin)=>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) 
    
    )

    setCryptos(filteredData);

  }, [cryptoListCoingecko,searchTerm]);

    
  
  if (isFetching) return '...Loading';


  return (
      <>

      {!simplified&& (
           <div className="search-crypto" hidden={simplified}>
           <Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)}/>
         </div>
      )}
       

        <Row gutter={[32,32]} className="crypto-card-container"> 
          {cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
              <Link to={`/crypto/${currency.id}`}>
                <Card title={`${currency.market_cap_rank}. ${currency.name} (${currency.symbol})`}
                      extra={<img alt='' className="crypto-image" src={currency.image}/>}
                      hoverable
                    >
                    <p>Price: {millify(currency.current_price)}</p>
                    <p>Market Cap: {millify(currency.market_cap)}</p>
                    <p>Daily Change: {millify(currency.market_cap_change_percentage_24h)}%</p>

                </Card>
              </Link>
            </Col>
          ))}
        </Row>


      </>
  );
};

export default Cryptocurrencies;