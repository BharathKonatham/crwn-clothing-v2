
type


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

