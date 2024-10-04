import { Routes,Route } from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../../routes/catogries-preview/categories-preivew.component";
import Category from "../../routes/category/category.component";
//import { setCategories } from '../../store/categories/catergory.action'
import { useEffect } from "react";
//import {getCategoriesAndDocuments} from '../../utils/firebase.utils.js'
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/catergory.action";
const Shop = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(fetchCategoriesStart()) //thunk function 
       // const getCategoryMap = async ()=>{
            // const  categoriesArray = await getCategoriesAndDocuments()
            // console.log(categoriesArray)
            // dispatch(setCategories(categoriesArray))
            
       // }
    //   getCategoryMap()
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (

        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop