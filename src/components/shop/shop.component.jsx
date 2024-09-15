
import { productsContext } from '../../contexts/products.context'
import { useContext } from 'react'
import ProductCard from '../product-card/product-card.component'
import './shop.styles.scss'
const Shop = ()=>{
    const {products} = useContext(productsContext)
    console.log(products)
    return (
        <div className='products-container'>
           {products.map((product)=>{
            return (
                <ProductCard  product={product} key={product.id}/>
            )
           })}
        </div>
    )
}

export default Shop