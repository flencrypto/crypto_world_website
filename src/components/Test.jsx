import React,{useState,useEffect} from "react";
import millify from "millify";
import { Card,Row,Col, Input, Pagination,Table  } from "antd";
import { useGetCryptosCoingeckoQuery,useGetAllCryptosCoingeckoQuery } from "../apiServices/cryptoApi";
import Autocomplete from "./Autocomplete";


const Test = ({simplified}) => {
  const onPage = 'Test'
  const [per_page, setPer_page] = useState(simplified ? 10 :100);
  const [page, setPage] = useState(1);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');


  const {data:cryptosCoingecko, isFetching} = useGetCryptosCoingeckoQuery({page,per_page});

  const {data:allCryptos} = useGetAllCryptosCoingeckoQuery();





  useEffect(() => {
    setCryptos(cryptosCoingecko)

    const filteredData = cryptosCoingecko?.filter((coin)=>
        coin.name.toLowerCase().startsWith(searchTerm.toLowerCase()) 
      || 
        coin.symbol.toLowerCase().startsWith(searchTerm.toLowerCase()) 
    )

    setCryptos(filteredData);

  }, [cryptosCoingecko,searchTerm,page]);


    
  if (isFetching) return '...Loading';

  // console.log(cryptos)

  const tableData = []

  cryptos?.map((coin,index)=>tableData.push({
    key:index,
    ranked_by_market_cap: coin?.market_cap_rank,
    id:coin?.id,
    name:<><img alt='' className="crypto-image" src={coin?.image}/> {coin?.name}</>,
    symbol:coin?.symbol.toUpperCase(),
    market_cap: millify(coin?.market_cap),
    current_price: millify(coin?.current_price),
    price_change_percentage_24h: millify(coin?.price_change_percentage_24h)+'%',
  }))

const columns = [
    {
        title: '#',
        dataIndex: 'ranked_by_market_cap',
      },
    {
      title: 'Name',
      dataIndex: 'name' ,
    },
    {
        title: 'Symbol',
        dataIndex: 'symbol',
      },
    {
        title: 'Price',
        dataIndex: 'current_price',
                // { 
        //   const c = Number(a.current_price.replace(/[$,]/g, ''))
          
        //   const d = Number(b.current_price.replace(/[$,]/g, ''))
        //   console.log(c,d)
    
        // //  a.current_price - b.current_price,
        // }
    },
    {
        title: '24h Change',
        dataIndex: 'price_change_percentage_24h',
    },
    
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
    },
  ];



  return (
      <>

      {!simplified&& (
           <div className="search-crypto" hidden={simplified}>
            {/* <Input hidden allowClear placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)} /> */}
          <Autocomplete onPage={onPage}></Autocomplete>

         </div>
      )}

    <Table dataSource={tableData} columns={columns} pagination={false} />;

        {/* <Row gutter={[32,32]} className="crypto-card-container"> 
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
        </Row> */}

        {!simplified&&
        <div>

            <Pagination
              showSizeChanger = {true}
              current={page}
              onShowSizeChange={(curent,per_page)=>setPer_page(per_page)}
              pageSize={per_page}
              defaultCurrent={1}
              total={allCryptos?.length} //total cryptos 
              onChange={(page)=>setPage(page)}
            />

        
        </div>}
          


          


      </>
  );
};

export default Test;


