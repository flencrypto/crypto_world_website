import React from "react";
import ReactPaginate from "react-paginate";
import {useGetExchangesCoingeckoQuery} from '../services/cryptoApi'

const Exchanges = () => {
  const {data:exchanges,isFetching} = useGetExchangesCoingeckoQuery();

  exchanges&&console.log(exchanges)

  return (
    <div>

    Exchanges
    </div>
  );
};

export default Exchanges;
