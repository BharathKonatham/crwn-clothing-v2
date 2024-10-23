import { CATEGORIES_ACTION_TYPES, Category } from "./category.types"
import { createAction,action,actionWithPayload , withMatcher} from '../../utils/reducer.util'

// below three are the action types that our reducer accept
export type FetchCategoriesStart = action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = actionWithPayload <CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS , Category[]>

export type FetchCategoriesFailed = actionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>



//below three are the actions for category which are typed
export const fetchCategoriesStart = withMatcher(():FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START))

export const fetchCategoriesSuccess =withMatcher((categoriesArray:Category[]):FetchCategoriesSuccess => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesArray))

export const fetchCategoriesFailed =withMatcher((error:Error)=> createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error))


