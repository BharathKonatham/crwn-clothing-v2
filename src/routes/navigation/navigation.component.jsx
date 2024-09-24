
import { Link, Outlet } from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
//import { userContext } from '../../contexts/user.context'
//import { useContext } from 'react'
import { signOutUser } from '../../utils/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
//import { CartContext } from '../../contexts/cart.context'
import './navigation.styles.scss'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'

const Navigation= () => {

  //a helper funciton from user.selecctor which returns (state)=>state.user.currentUser is 
  //implemented for code readability
  const currentUser = useSelector(selectCurrentUser ) 
  const isCartOpen = useSelector(selectIsCartOpen)
  //const {isCartOpen} = useContext(CartContext)

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