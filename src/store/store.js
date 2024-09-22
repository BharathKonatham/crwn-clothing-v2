import { compose,legacy_createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//logger is used to see the state value before an action is dispatche and after actions
const middleWares = [logger] 

//for logger to work we need middleware, these are run/hit before action hits reducer, when dispatch happens
//middleware are enhancers which we need below to apply all middlewares
const composedEnahncers = compose(applyMiddleware(...middleWares))
//root reducer
export const store = legacy_createStore(rootReducer,undefined,composedEnahncers) //optional second paramter
