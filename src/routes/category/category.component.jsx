
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import './category.styles.scss'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/category.selector'
const Category = () => {
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products,setProducts] = useState(categoriesMap[category])


    //as getting the categories from the firebaes is async operation, we get error
    //when iteratin through producets using map intitally as the shop is rendered with empty categoriesMap object, 
    //so we use && to rendert the products conditionally , and we ues the useEffect to updated the products
    //when they are available from asyn operation, and then we iterate using map.All of this is done instantly 
    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[categoriesMap,category])
    
  return (<>
    <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
    <div className='category-container'> 
      {
          products && products.map((product)=><ProductCard  key={product.id} product={product}/>)
          }
    </div>
    </>
  
  )
}

export default Category