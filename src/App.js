
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './components/shop/shop.component';
import Checkout from './routes/checkout/checkout.component'
import {  useEffect } from "react";
import { checkUserSession } from './store/user/user.action';
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    //const unsubscribe = onAuthStateChangedListner( //instead of having a listner that responds for user state change 
    //                                                 //we implement a promise based in firebase Utils
    //     (user)=>{ 
    //         console.log(user)
    //         if(user){
    //              createUserDocumentFromAuth(user)
    //         }
    //         dispatch(setCurrentUser(user))
    //     }
    // )
    // return unsubscribe
    console.log('chekcing user session')
  dispatch(checkUserSession())
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
