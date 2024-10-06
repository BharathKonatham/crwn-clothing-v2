import './product-card.styles.scss'

import Button from '../button/button.component'
//import { CartContext } from '../../contexts/cart.context'
//import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { addCartItems } from '../../store/cart/cart.reducer'


const ProductCard = ({product})=>{
    const dispatch = useDispatch()
    const {name,price,imageUrl} = product
    //const {addItemToCart} = useContext(CartContext)
    const addItemToCart=()=>{
        dispatch(addCartItems(product))
    }
    return (
        <div className='product-card-container'>
            <img src= {imageUrl} alt={`${name}`} />
            
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>

            <Button buttonType='inverted' onClick={addItemToCart}>Add to cart</Button>
        </div>
    )
}

export default ProductCard