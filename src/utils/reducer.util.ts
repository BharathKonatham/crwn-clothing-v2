import { AnyAction } from "redux-saga";
import { fetchCategoriesStart } from "../store/categories/catergory.action";
type Matchable< AC extends ()=> AnyAction> = AC & {
    type: ReturnType<AC>['type']
    match(action:AnyAction):action is ReturnType<AC>
}


export function withMatcher<AC extends () => AnyAction & {type: string} > (actionCreator: AC) : Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {type:string} >(actionCreator:AC) : Matchable<AC>;

export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator , {
        type,
        match(action:AnyAction){
            return action.type === type;
        }
    })
}

export type actionWithPayload<T,P> ={
    type:T;
    payload:P;
}

export type action<T> ={
    type:T
}
export function createAction<T extends string, P>(type:T,payload:P):actionWithPayload<T,P>;

export function createAction<T extends string>(type:T, payload:void):action<T>;

export function createAction<T extends string, P>(type:T, payload:P){
    return {type,payload}
}

