import { Routes,Route } from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../../routes/catogries-preview/categories-preivew.component";
import Category from "../../routes/category/category.component";
import { setCategoriesMap } from '../../store/categories/catergory.action'
import { useEffect } from "react";
import {getCategoriesAndDocuments} from '../../utils/firebase.utils.js'
import { useDispatch } from "react-redux";
const Shop = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        
        const getCategoryMap = async ()=>{
            const  categoriesMap = await getCategoriesAndDocuments()
           
            dispatch(setCategoriesMap(categoriesMap))
        }
      getCategoryMap()
      
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