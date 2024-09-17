import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
import { userContext } from '../../contexts/user.context'
import { useContext } from 'react'
import { signOutUser } from '../../utils/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { CartContext } from '../../contexts/cart.context'
const Navigation= () => {

  const {currentUser} = useContext(userContext)
  
  const {isCartOpen} = useContext(CartContext)

  const signOutHandler = async ()=>{
    const response = await signOutUser()
    console.log(response)
  }
  
  return (
    <>
      <div className='navigation'>
            <Link className='logo' to='/'>
                <div className='logo-container'>
                    <CrwnLogo className='logo' />
                </div>
            </Link>
            
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'> 
                    SHOP
                </Link>
                {currentUser ? <span className='nav-link' onClick={signOutHandler}>{' '}SIGN OUT {' '}</span> : <Link className='nav-link' to='/authentication'> 
                SIGN IN
                </Link>}
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation