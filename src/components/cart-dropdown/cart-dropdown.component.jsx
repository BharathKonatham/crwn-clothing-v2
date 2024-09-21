import './cart-dropdown.styles.scss'
import React, { useContext } from 'react'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context'
import { useNavigate } from 'react-router-dom'
const CartDropdown = () => {

  const {cartItems,setIsCartOpen,isCartOpen} = useContext(CartContext)
  const navigate = useNavigate()
  const goToCheckoutHandler = ()=>{
    navigate('/checkout')
    setIsCartOpen(isCartOpen ? false: true)
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