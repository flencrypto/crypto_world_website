import React,{useState,useEffect} from "react";
import millify from "millify";
import {Pagination,Table  } from "antd";
import { useGetCryptosCoingeckoQuery,useGetAllCryptosCoingeckoQuery } from "../apiServices/cryptoApi";
import { Link } from "react-router-dom";
import Autocomplete from "./Autocomplete";



const Cryptocurrencies = ({simplified}) => {
  const onPage = 'Cryptocurrencies';
  const [per_page, setPer_page] = useState(simplified ? 10 :50);
  const [page, setPage] = useState(1);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const {data:cryptosCoingecko, isFetching} = useGetCryptosCoingeckoQuery({page,per_page},{pollingInterval:60000});
  // console.log({cryptosCoingecko})

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


  //Table
  const tableData = []

  cryptos?.map((coin,index)=>tableData.push({
    key:index,
    ranked_by_market_cap: coin?.market_cap_rank||'No Rank',
    name:<Link to={`/crypto/${coin?.id}`}>
              <img alt='' className="crypto-image" src={coin?.image}/> {coin?.name}
          </Link>,
    symbol:coin?.symbol.toUpperCase()||'Null',
    current_price: (coin?.current_price)?(coin?.current_price).toLocaleString("en-US",{style: "currency",currency: "usd"}):'Null',
    price_change_percentage_24h: (coin?.market_cap_change_percentage_24h)?(coin?.price_change_percentage_24h).toLocaleString("en-US",{maximumFractionDigits: 2})+'%':'Null',
    market_cap: (coin?.market_cap)?'$'+(coin?.market_cap).toLocaleString("en-US",{style: "decimal",currency: "usd"}):'Null',
  }))


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
            <div className="search-crypto">

            <Autocomplete onPage={onPage}></Autocomplete>

          </div>
        )}

        <Table dataSource={tableData} columns={columns} pagination={false} />

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