import React,{useState,useEffect} from "react";
import millify from "millify";
import { Card,Row,Col, Input, Pagination,AutoComplete,Table  } from "antd";
import { useGetCryptosCoingeckoQuery,useGetAllCryptosCoingeckoQuery } from "../services/cryptoApi";
import { useHistory,Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons/lib/icons";


const {Option} = AutoComplete; 

const Cryptocurrencies = ({simplified}) => {
  const [per_page, setPer_page] = useState(simplified ? 10 :50);
  const [page, setPage] = useState(1);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const {data:cryptosCoingecko, isFetching} = useGetCryptosCoingeckoQuery({page,per_page});

  const {data:allCryptos} = useGetAllCryptosCoingeckoQuery();


  //Autocomplete
  const [options, setOptions] = useState([]);
  
  const onSearch = (searchText) => {
    const filteredData = allCryptos?.filter((coin)=>
        coin.name.toLowerCase().startsWith(searchText.toLowerCase()) 
        
      || 
        coin.symbol.toLowerCase().startsWith(searchText.toLowerCase())
        ) 
    // console.log({'filteredData':filteredData})
    // let cryptoArray = [];
    // filteredData.map((coin)=>cryptoArray.push(coin.name+ ' (' + coin.symbol.toUpperCase() +')'))
    // filteredData.map((coin)=>cryptoArray.push({value:coin.name+ ' (' + coin.symbol.toUpperCase() +')'}))

     setOptions(!searchText ? [] : filteredData)    
    
  };

  const  history = useHistory();
  const onSelect = (data) => {
      if ( data !== '') {
          history.push(`/crypto/${data}`)
      }
  };



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


  //Table
  const tableData = []
  cryptos?.map((coin,index)=>tableData.push({
    key:index,
    ranked_by_market_cap: coin?.market_cap_rank||'No Rank',
    name:<><Link to={`/crypto/${coin?.id}`}>
              <img alt='' className="crypto-image" src={coin?.image}/> {coin?.name}
            </Link></>,
    symbol:coin?.symbol.toUpperCase()||'Null',
    current_price: (coin?.current_price)?(coin?.current_price).toLocaleString("en-US",{style: "currency",currency: "usd"}):'Null',
    price_change_percentage_24h: (coin?.market_cap_change_percentage_24h)?(coin?.price_change_percentage_24h).toFixed(2)+'%':'Null',
    market_cap: (coin?.market_cap)?'$'+(coin?.market_cap).toLocaleString("en-US",{style: "decimal",currency: "usd"}):'Null',
  }))

  // const coinNameArray = []
  // cryptos?.map((coin)=> coinNameArray.push({text:coin?.symbol,value:coin?.symbol}))


const columns = [
    {
        title: '#',
        dataIndex: 'ranked_by_market_cap',
        key:'ranked_by_market_cap',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.ranked_by_market_cap - b.ranked_by_market_cap,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a, b) =>{
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }
        // names must be equal
        return 0;
      },
    },
    {
        title: 'Price',
        dataIndex:'current_price',
        key: 'current_price',
        sorter: (a, b) =>  Number(a.current_price.replace(/[$,]/g, '')) - Number(b.current_price.replace(/[$,]/g, ''))
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
        key: 'price_change_percentage_24h',
        sorter: (a, b) => Number(a.price_change_percentage_24h.replace(/%/g, '')) - Number(b.price_change_percentage_24h.replace(/%/g, '')),
    },
    
    {
      title: 'Market Cap', 
      dataIndex: 'market_cap',
      key: 'market_cap',
      sorter: (a,b) => Number(a.market_cap.replace(/[$,]/g, '')) - Number(b.market_cap.replace(/[$,]/g, ''))
    },
  ];


  return (
      <>

      {!simplified&& (
           <div className="search-crypto" hidden={simplified}>

           <Input hidden allowClear placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)} />
           <AutoComplete hidden={false}
                        onSelect={onSelect}  onSearch={onSearch}
                        //  onChange={onChange}
                        allowClear
                        placeholder={<> <SearchOutlined/> Search...</>}
                        style={{width:300}}>
                          
                  
                      {options.map((option,i)=> (                    
                        <Option key={option.id} value={option.id}>
                          {/* value={option.name + ' (' + option.symbol.toUpperCase() + ')'} */}
                          <Input type='submit' 
                                  bordered={false}  
                                  value={option.name + ' (' + option.symbol.toUpperCase() + ')'}/>
                        </Option>
                      ))}

         </AutoComplete>

         </div>
      )}

    <Table dataSource={tableData} columns={columns} pagination={false} />

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

export default Cryptocurrencies;