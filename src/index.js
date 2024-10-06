import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//import { UserProvider } from './contexts/user.context';
//import { CategoriesProvider } from './contexts/categories.context';
//import { CartProvider } from './contexts/cart.context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <Provider store={store}> {/*  redux store provider */}
        {/* <UserProvider> user data */}
          {/* <CategoriesProvider>  products data */}
            {/* <CartProvider> cart open or closed status provider */}
            {/*<PersistGate persistor={persistor} >  persistor to retains state after refresh */}
              <App />
            {/*</PersistGate>*/}
              
            {/* </CartProvider> */}
          {/* </CategoriesProvider>  */}
        {/* </UserProvider> */}
      </Provider>
      
    
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
