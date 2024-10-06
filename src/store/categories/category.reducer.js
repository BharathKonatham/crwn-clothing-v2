import { createSlice } from "@reduxjs/toolkit"
//import { CATEGORIES_ACTION_TYPES } from "./category.types"

const INITIAL_STATE = {
    categories: []
}

export const categoriesSlice = createSlice({
    name:'categories',
    initialState:INITIAL_STATE,
    reducers:{
        setCategories(state,action){
            state.categories=action.payload
        }
    }
})


export const {setCategories} = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer