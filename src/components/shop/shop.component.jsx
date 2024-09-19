import { Routes,Route } from "react-router-dom";

import './shop.styles.scss'
import CategoriesPreview from "../../routes/catogries-preview/categories-preivew.component";
import Category from "../../routes/category/category.component";

const Shop = ()=>{
    return (

        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop