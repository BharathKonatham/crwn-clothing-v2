
import { fetchCategoriesStart,fetchCategoriesSuccess, fetchCategoriesFailed} from "./catergory.action"
import { Category } from "./category.types";
import { AnyAction } from "redux-saga";
export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;

}


const categoriesSlice :CategoriesState = {
    categories: [],
    isLoading: false,
    error:null
}

export const categoriesReducer  = (state = categoriesSlice, action = {} as AnyAction) :CategoriesState =>{

    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading:true}

    }

    if(fetchCategoriesSuccess.match(action)){
        return { ...state, categories: action.payload, isLoading:false }
    }
    if(fetchCategoriesFailed.match(action)){
        return  {...state,error:action.payload, isLoading:false }
    }
    // switch (action.type){

    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START: {
    //         return { ...state,isLoading:true }
    //     }
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: {
            
    //         return { ...state, categories: action.payload, isLoading:false }
    //     }
       
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:{
    //         return { ...state,error:action.payload, isLoading:false }
    //     }
    //     default: 
    //         return state;
    // }

    return state
}