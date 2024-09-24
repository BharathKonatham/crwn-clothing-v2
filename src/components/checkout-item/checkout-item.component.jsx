import './checkout-item.styles.scss'
//import { useContext } from 'react'
//import { CartContext } from '../../contexts/cart.context'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { setRemoveEntireItem,setCartItems,setRemoveItemFromCart } from '../../store/cart/cart.actions'

const CheckoutItem = ({cartItem})=>{
    const dispatch  = useDispatch()
    const cartItems = useSelector(selectCartItems)
    //const {removeEntireItem,addItemToCart,removeItemFromCart} = useContext(CartContext)
    const {name,imageUrl,price,quantity,id} = cartItem
    const clearItemHandler = ()=> dispatch(setRemoveEntireItem(cartItems,id))
    const addItemHandler = ()=>  dispatch(setCartItems(cartItems,cartItem))
    const removeItemHandler = ()=> dispatch(setRemoveItemFromCart(cartItems,cartItem))
    
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'> {quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem