
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { categoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import './category.styles.scss'

const Category = ({title}) => {
    const {category} = useParams()
    const {categoriesMap} = useContext(categoriesContext)
    const [products,setProducts] = useState(categoriesMap[category])

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