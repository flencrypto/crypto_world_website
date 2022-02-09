import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css';

import { Provider } from "react-redux"
import store from './apiServices/store/store'



ReactDOM.render(
 
  <BrowserRouter>
     <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
