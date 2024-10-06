
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './components/shop/shop.component';
import Checkout from './routes/checkout/checkout.component'
import {  useEffect } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "./utils/firebase.utils";
import { setCurrentUser } from './store/user/user.reducer';
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListner(
        (user)=>{ 
            console.log(user)
            if(user){
                 createUserDocumentFromAuth(user)
            }
            console.log(setCurrentUser(user))
            dispatch(setCurrentUser(user))
        }
    )
    return unsubscribe
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />}/>
        <Route path='/shop/*' element={<Shop />}/>
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>
        
     
    </Routes>
  );
};

export default App;
