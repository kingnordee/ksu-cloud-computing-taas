import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './components/App';
//import { configureStore } from '@reduxjs/toolkit'
//import {rootReducer} from './utils/Redux'
//import {Provider} from "react-redux";

//const store = configureStore({
//    reducer: rootReducer,
//})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      {/*<Provider store={store}>*/}
          <App />
      {/*</Provider>*/}
  </React.StrictMode>
);
