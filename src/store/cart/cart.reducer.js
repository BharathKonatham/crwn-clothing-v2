import { createSlice } from "@reduxjs/toolkit"


export const addItem = (cartItems,productToAdd)=>{
   
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
export const removeItem = (cartItems,productToRemove)=>{
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

export const removeItemAll = (cartItems,id)=>{
    return cartItems.filter((item)=> item.id !== id)
}


const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems:[],
    // cartCount:0,
    // total:0
}

export const cartSlice = createSlice({
    name:'cart',
    initialState:CART_INITIAL_STATE,
    reducers:{
        setIsCartOpen(state,action){
            state.isCartOpen = action.payload
        },
        addCartItems(state,action){
            state.cartItems = addItem(state.cartItems,action.payload)
        },
        removeCartItems(state,action){
            state.cartItems = removeItem(state.cartItems,action.payload)
        },
        removeEntireItem(state,action){
            state.cartItems = removeItemAll(state.cartItems,action.payload)
        }

    }
})

export const {setCartItems,setIsCartOpen,addCartItems,removeCartItems,removeEntireItem} = cartSlice.actions
export const cartReducer =  cartSlice.reducer 