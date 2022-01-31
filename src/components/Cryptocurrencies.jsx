import React,{useState,useEffect} from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card,Row,Col, Input } from "antd";
 import { Pagination } from 'antd';
import ReactPaginate from "react-paginate";

import { useGetCryptosCoingeckoQuery,useGetAllCryptosCoingeckoQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {

  const per_page = simplified ? 10 :20;
  const [page, setPage] = useState(1);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const {data:cryptosCoingecko, isFetching} = useGetCryptosCoingeckoQuery({page,per_page});

  const {data:allCryptos,isFetching:isFetchingCoinList} = useGetAllCryptosCoingeckoQuery();


  
  useEffect(() => {
    setCryptos(cryptosCoingecko)

    const filteredData = cryptosCoingecko?.filter((coin)=>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) 
    
    )

    setCryptos(filteredData);

  }, [cryptosCoingecko,searchTerm,page]);

    
  
  if (isFetching) return '...Loading';



  const  onShowSizeChange = (current, pageSize) =>{
    console.log(current, pageSize);
  }

  const onPageChange = (page) => {
    setPage(page)
  }


  return (
      <>

      {!simplified&& (
           <div className="search-crypto" hidden={simplified}>
           <Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)}/>
         </div>
      )}
       

        <Row gutter={[32,32]} className="crypto-card-container"> 
          {cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency?.id}>
              <Link to={`/crypto/${currency?.id}`}>
                <Card title={`${currency.market_cap_rank?currency.market_cap_rank:'Unrank'}. 
                                ${currency?.name} 
                                (${currency?.symbol.toUpperCase()})`}
                      extra={<img alt='' className="crypto-image" src={currency?.image}/>}
                      hoverable
                    >
                    <p>Price: {currency.current_price?currency.current_price:'No data'}</p>
                    <p>Market Cap: {currency.market_cap?millify(currency.market_cap):'No data'}</p>
                    <p>Daily Change: {currency.market_cap_change_percentage_24h?millify(currency.market_cap_change_percentage_24h) + '%':'No data'}</p>

                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {!simplified&&
        <div>

            <Pagination
              showSizeChanger = {false}
              current={page}
              // onShowSizeChange={onShowSizeChange}
              pageSize={per_page}
              defaultCurrent={1}
              total={allCryptos.length} //total
              onChange={onPageChange}
            />


            {/* <br />
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
              disabled
            /> */}
        
        </div>}
          


          


      </>
  );
};

export default Cryptocurrencies;