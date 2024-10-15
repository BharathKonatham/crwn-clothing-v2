
export enum CATEGORIES_ACTION_TYPES  {
   // SET_CATEGORIES:'category/SET_CATEGORIES', //ARRAY
    FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED ='FETCH_CATEGORIES_FAILED' 
}

export type CategoryItem ={
    id:number;
    imageUrl:string;
    name:string;
    price:number
}

export type Category ={
    title: string;
    imageUrl:string;
    items: CategoryItem[]
}