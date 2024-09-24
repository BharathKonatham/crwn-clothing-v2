import './cart-icon.styles.scss'
import{ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
// import { CartContext } from '../../contexts/cart.context'
// import { useContext } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setCartOpen } from '../../store/cart/cart.actions'
const CartIcon = ()=>{
    const dispatch = useDispatch()
    //const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)

    const displayCart = ()=>{
        dispatch(setCartOpen(!isCartOpen))
      }
    return (
        <div className='cart-icon-container' onClick={displayCart}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon