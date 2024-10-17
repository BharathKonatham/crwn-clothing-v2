import { CATEGORIES_ACTION_TYPES } from "./category.types"
import { CategoryAction, } from "./catergory.action"
import { Category } from "./category.types";

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

export const categoriesReducer  = (state = categoriesSlice, action = {} as CategoryAction) :CategoriesState =>{

    
    switch (action.type){

        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START: {
            return { ...state,isLoading:true }
        }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: {
            
            return { ...state, categories: action.payload, isLoading:false }
        }
       
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:{
            return { ...state,error:action.payload, isLoading:false }
        }
        default: 
            return state;
    }
}