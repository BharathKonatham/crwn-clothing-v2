import './product-card.styles.scss'

import Button from '../button/button.component'
//import { CartContext } from '../../contexts/cart.context'
//import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../../store/cart/cart.actions'
import { selectCartItems } from '../../store/cart/cart.selector'


const ProductCard = ({product})=>{
    const dispatch = useDispatch()
    const {name,price,imageUrl} = product
    //const {addItemToCart} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const addItem=()=>{
        dispatch(setCartItems(cartItems,product)) 
    }
    return (
        <div className='product-card-container'>
            <img src= {imageUrl} alt={`${name}`} />
            
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>

            <Button buttonType='inverted' onClick={addItem}>Add to cart</Button>
        </div>
    )
}

export default ProductCard