import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
//import { stripePromise } from './stripe/stripe.utils';
const stripePromise = loadStripe('pk_test_51Q72NTP7FdtR1OK6wqREZtM8bIPorr7IswxPgupDGyqJ1Lj0bcUYQyfYH4LrcO3hQT5XJjhs9I89xZFg6vAAqnn600rX23EWzx')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/*  redux store provider */}
        <PersistGate persistor={persistor} > {/* persistor to retains state after refresh */}
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
