import { createContext, useReducer } from "react";


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

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: ()=>{},
        cartItems:[],
        addItemToCart:()=>{},
        cartCount:0,
        removeItemFromCart:()=>{},
        removeEntireItem:()=>{},
        total:0
    }
)
const INITIAL_STATE = {
        isCartOpen: false,
        cartItems:[],
        cartCount:0,
        total:0
}


const cartReducer = (state,action)=>{
    const {type,payload} = action
    switch(type){
        case('SET_CART_ITEMS'):{return {...state,...payload}}
        case('IS_CART_OPEN'):{return {...state,...payload}}
        default:throw Error (`unhandled ${type} `)
    }
}
const removeItemAll = (cartItems,id)=>{
    return cartItems.filter((item)=> item.id !== id)
}

export const CartProvider = ({children})=>{

    const [state,dispatch] = useReducer(cartReducer,INITIAL_STATE)
    const {cartItems,isCartOpen,cartCount,total} = state

    const updateCartItemsReducer = (newCartItems)=>{
        const cartCount = newCartItems.reduce((acc,item)=> acc+ item.quantity,0)
        
        const total = newCartItems.reduce((acc,item)=>acc+ item.quantity * item.price,0)
       
        dispatch({type:'SET_CART_ITEMS', payload:{cartItems:newCartItems,cartCount,total}})
    }
   

    const addItemToCart = (productToAdd)=>{
        //console.log(productToAdd)
        const newCartItems = addItem(cartItems,productToAdd)
        updateCartItemsReducer(newCartItems)
       
    }
    const removeItemFromCart = (producToRemove)=>{
        const newCartItems = removeItem(cartItems,producToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const removeEntireItem = (id)=>{
        const newCartItems = removeItemAll(cartItems,id)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (isOpen)=>{
        dispatch({type:'IS_CART_OPEN',payload:{isCartOpen:isOpen}})
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,removeItemFromCart,removeEntireItem,total,cartReducer}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}