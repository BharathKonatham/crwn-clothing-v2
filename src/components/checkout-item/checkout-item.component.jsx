import './checkout-item.styles.scss'
//import { useContext } from 'react'
//import { CartContext } from '../../contexts/cart.context'
import { useDispatch } from 'react-redux'
import { addCartItems,removeCartItems,removeEntireItem } from '../../store/cart/cart.reducer'
const CheckoutItem = ({cartItem})=>{
    const dispatch  = useDispatch()
    //const {removeEntireItem,addItemToCart,removeItemFromCart} = useContext(CartContext)
    const {name,imageUrl,price,quantity,id} = cartItem
    const clearItemHandler = ()=> dispatch(removeEntireItem(id))
    const addItemHandler = ()=>  dispatch(addCartItems(cartItem))
    const removeItemHandler = ()=> dispatch(removeCartItems(cartItem))
    
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