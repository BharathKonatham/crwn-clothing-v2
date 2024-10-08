import { CATEGORIES_ACTION_TYPES } from "./category.types"
import { createAction } from '../../utils/reducer.util'
//import {getCategoriesAndDocuments} from '../../utils/firebase.utils.js'

// export const setCategories = (categoriesArray)=> createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES,categoriesArray)

export const fetchCategoriesStart = ()=> createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray)=> createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesArray)

export const fetchCategoriesFailed = (error)=> createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error)


// export const fetchCategoriesAsync = ()=> async (dispatch)=>{
//     dispatch(fetchCategoriesStart())
//     try{
//         const  categoriesArray = await getCategoriesAndDocuments()
//         dispatch(fetchCategoriesSuccess(categoriesArray))
//     }catch(error){
//         dispatch(fetchCategoriesFailed(error))
//     }
    
            
// }