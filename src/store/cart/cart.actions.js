import { createAction } from "../../utils/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";

const addItem = (cartItems,productToAdd)=>{
   
    const itemExist= cartItems.find((item)=>(
        item?.id === productToAdd.id
    ))
    
    if(itemExist){
        return cartItems.map((cartItem)=>{
            if(cartItem.id === productToAdd.id){
              return  {...cartItem,quantity: cartItem.quantity+1}
            }else{
                return cartItem
            }
        })
    }else{
        return  [...cartItems,{...productToAdd,quantity:1}]

    }

}
const removeItem = (cartItems,productToRemove)=>{
    if(productToRemove.quantity === 1 ) {
        return cartItems.filter((item)=> item.id !== productToRemove.id)
    }
    const itemExist= productToRemove.quantity > 1
    if(itemExist){
        return cartItems.map((cartItem)=>{
            if(cartItem.id === productToRemove.id){
              return  {...cartItem,quantity: cartItem.quantity - 1}
            }else{
                return cartItem
            }
        })
    }
}    

const removeItemAll = (cartItems,id)=>{
    return cartItems.filter((item)=> item.id !== id)
}

const addItemToCart = (cartItems,productToAdd)=>{
    //console.log(productToAdd)
    const newCartItems = addItem(cartItems,productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
   
}
const removeItemFromCart = (cartItems,producToRemove)=>{
    const newCartItems = removeItem(cartItems,producToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}

const removeEntireItem = (cartItems,id)=>{
    const newCartItems = removeItemAll(cartItems,id)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}

const setIsCartOpen = (isCartOpen)=>{
    console.log(isCartOpen)
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,isCartOpen)
}

export const setCartItems = (cartItems,productToAdd)=>addItemToCart(cartItems,productToAdd)
export const setRemoveEntireItem  = (cartItems,productToRemove)=>removeEntireItem(cartItems,productToRemove)
export const setRemoveItemFromCart= (cartItems,producToRemove)=> removeItemFromCart(cartItems,producToRemove)
export const setCartOpen = (isCartOpen)=>setIsCartOpen(isCartOpen)