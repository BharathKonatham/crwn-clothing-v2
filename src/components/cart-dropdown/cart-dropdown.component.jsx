import './cart-dropdown.styles.scss'
//import React, { useContext } from 'react'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
//import { CartContext } from '../../contexts/cart.context'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.reducer'
const CartDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const {cartItems,setIsCartOpen,isCartOpen} = useContext(CartContext)
  const cartItems = useSelector(selectCartItems)
  const isCartOpen = useSelector(selectIsCartOpen)
  const goToCheckoutHandler = ()=>{
    navigate('/checkout')
    dispatch(setIsCartOpen(!isCartOpen ))
  }

  return (
    <div className='cart-dropdown-container'>
     
        <div className='cart-items'> 
        {cartItems.map((item)=>(<CartItem cartitem={item} key={item.id} />))}
        </div>
          <Button onClick={goToCheckoutHandler}>Checkout</Button>
        
    </div>
  )
}

export default CartDropdown
//