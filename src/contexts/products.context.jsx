
import {  createContext, useEffect, useState } from "react";
import SHOP_PRODUCTS from '../../src/shop-data.json'

export const productsContext = createContext({
    products: [],
    
})


export const ProductsProvider = ({children})=>{
    const [products,setProducts] = useState(SHOP_PRODUCTS)
    const value = {products,setProducts}
    useEffect(()=>{
        
    },[])
    return (
        <productsContext.Provider value={value}>{children}</productsContext.Provider>
    )
}