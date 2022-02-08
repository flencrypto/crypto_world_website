import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import {AutoComplete,Input} from 'antd';
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { useGetAllCryptosCoingeckoQuery } from "../apiServices/cryptoApi"

const Autocomplete = ({onPage,setNewsCategory}) => {

  const {data:allCryptos} = useGetAllCryptosCoingeckoQuery();
  const [options, setOptions] = useState([]); 

  //OnSearch
  const onSearch = (searchText) => {
    const filteredData = allCryptos?.filter((coin)=>
        coin.name.toLowerCase().startsWith(searchText.toLowerCase()) 
        
      || 
        coin.symbol.toLowerCase().startsWith(searchText.toLowerCase())
        ) 

    setOptions(!searchText ? [] : filteredData)    
    
  };

  //OnSelect
  const  history = useHistory();
  const onSelect = (data) => { 
    if (onPage==='Cryptocurrencies') {
      if ( data !== '') {
          history.push(`/crypto/${data}`);
      }
    }  

    else if (onPage==='News') {
      if ( data !== '') {
          setNewsCategory(data);
      }
    } else {
        if ( data !== '') {
          history.push(`/crypto/${data}`);
        }

    }

  };


  return (
      <>
      <AutoComplete
                    onSelect={onSelect}  onSearch={onSearch}
                    allowClear
                    placeholder={<> <SearchOutlined/> Search...</>}
                    style={{width:300}}
                    >
                              
                      {options.map((option,i)=> (
                                  
                        <AutoComplete.Option key={option.id} value={option.id}>
 
                          <Input type='submit' 
                                  bordered={false}  
                                  value={option.name + ' (' + option.symbol.toUpperCase() + ')'}/>
                        </AutoComplete.Option>
                      ))}

      </AutoComplete>
      </>
  )

};

export default Autocomplete;


