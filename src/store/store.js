import { compose,legacy_createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import { thunk } from "redux-thunk";



//logger is used to see the state value before an action is dispatche and after actions
//to prevent logging in producetion  WE USE process.env.NODE_ENV === 'development'
// to avoid passing false to the middler we use filter(Boolean) which filter or remove which
//is not true from the array
const middleWares = [process.env.NODE_ENV === 'development' && logger,thunk].filter(Boolean)

//below code is to use redux devtool extension, if it exist we user redux devtool composer else regular composesr from redux
const composeEnahncer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVETOOL_EXTENSION_COMPOSE__) || compose
//creating own logger middleware
// const loggerMiddleware = (store)=> (next)=>(action)=>{
//     if(!action.type){
//         return next(action)
//     }
//     console.log('type:',action.type)
//     console.log('payload:',action.payload)
//     console.log('currentState:',store.getState())

//     next(action);
//     console.log('next state:',store.getState())
// }
//const middleWares = [loggerMiddleware]

//for logger to work we need middleware, these are run/hit before action hits reducer, when dispatch happens
//middleware are enhancers which we need below to apply all middlewares
const composedEnahncers = composeEnahncer(applyMiddleware(...middleWares))
//root reducer


const persistConfig = {

    key:'root', // persist the data from root level 
    storage:storage, //storage uses local memorey 
    //blacklist: ['user'] //don't persist reducers mention in this array
    whitelist: ['cart'] // persist reducers only mentioned in this array
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
//replace rootReducer with persistedReducer
export const store = legacy_createStore(persistedReducer,undefined,composedEnahncers) //optional second paramter

export const persistor = persistStore(store)