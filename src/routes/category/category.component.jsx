
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import './category.styles.scss'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/category.selector'
import { selectCategoriesIsLoading } from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner.component'

const Category = () => {
    const {category} = useParams()
    const isLoading = useSelector(selectCategoriesIsLoading)
    console.log('render/re-render category component')
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products,setProducts] = useState(categoriesMap[category])
    
    

    //as getting the categories from the firebaes is async operation, we get error
    //when iteratin through producets using map intitally as the shop is rendered with empty categoriesMap object, 
    //so we use && to rendert the products conditionally , and we ues the useEffect to updated the products
    //when they are available from asyn operation, and then we iterate using map.All of this is done instantly 
    useEffect(()=>{
      console.log('effect fired calling setproduct')
      setProducts(categoriesMap[category])
    },[categoriesMap,category])
    console.log(isLoading)
  return (
  <>
    <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
    {isLoading? (<Spinner />): 
    
      (<div className='category-container'> 
      {
          products && products.map((product)=><ProductCard  key={product.id} product={product}/>)
          }
    </div>)
    }
    
    </>
  
  )
}

export default Category