
import {  createContext, useEffect, useState } from "react";
//import SHOP_DATA from '../shop-data.js'
import {  getCategoriesAndDocuments } from "../utils/firebase.utils.js";

export const categoriesContext = createContext({
    categoriesMap: {},
    
})


export const CategoriesProvider = ({children})=>{
    const [categoriesMap,setCategoriesMap] = useState({})
    


    // Below code inserts all the products data into firestore database, only use it Once 
    //for project for pushing data into data base and never run it again as it makes duplicate of same data
    //as in this application we are contoling from frontend
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // },[])

    // below use affect is to pull the categories information from firabse db

    useEffect(()=>{
        
        const getCategoryMap = async ()=>{
            const  categoriesMap = await getCategoriesAndDocuments()
           
            setCategoriesMap(categoriesMap)
        }
      getCategoryMap()
      
    },[])
    


    const value = {categoriesMap}
    return (
        <categoriesContext.Provider value={value}>{children}</categoriesContext.Provider>
    )
}