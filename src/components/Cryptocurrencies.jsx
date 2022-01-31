import React,{useState,useEffect} from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card,Row,Col, Input } from "antd";
 import { Pagination,AutoComplete } from 'antd';

import { useGetCryptosCoingeckoQuery,useGetAllCryptosCoingeckoQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {

  // const per_page = simplified ? 10 :20;

  const [per_page, setPer_page] = useState(simplified ? 10 :100);
  const [page, setPage] = useState(1);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

 

  const {data:cryptosCoingecko, isFetching} = useGetCryptosCoingeckoQuery({page,per_page});

  const {data:allCryptos,isFetching:isFetchingAllCryptos} = useGetAllCryptosCoingeckoQuery();




  //Autocomplete

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]); //options is list of object with {value:<value>}
  // const [cryptoArray, setCryptoArray] = useState([]);
  
  const onSearch = (searchText) => {
    const filteredData = allCryptos?.filter((coin)=>
        coin.name.toLowerCase().includes(searchText.toLowerCase()) 
      || 
        coin.symbol.toLowerCase().includes(searchText.toLowerCase())
        ) 
    let cryptoArray = [];
    filteredData.map((coin)=>cryptoArray.push({value:coin.name+ ' (' + coin.symbol.toUpperCase() +')'}))

     setOptions(!searchText ? [] : cryptoArray)    
    
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };


  //Pagination

  const onShowSizeChange = (current, pageSize) =>{
    console.log(current, pageSize);

    setPer_page(pageSize)
  }

  const onPageChange = (page) => {
    setPage(page)
  }



  
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







  return (
      <>

      {!simplified&& (
           <div className="search-crypto" hidden={simplified}>

           <Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)} />

           <AutoComplete options={options} onSelect={onSelect}  onSearch={onSearch}
                        allowClear
                        placeholder="Search...."
                        style={{width:200}}/>

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
              showSizeChanger = {true}
              current={page}
              onShowSizeChange={onShowSizeChange}
              pageSize={per_page}
              defaultCurrent={1}
              total={allCryptos?.length} //total cryptos 
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