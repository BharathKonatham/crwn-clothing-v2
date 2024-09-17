import { createContext,useEffect,useState } from "react";


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
const removeItemAll = (cartItems,id)=>{
    return cartItems.filter((item)=> item.id !== id)
}

export const CartProvider = ({children})=>{

    const [isCartOpen,setIsCartOpen] = useState(false)
    const [cartItems,setCartItems] = useState([])
    const [cartCount,setCartCount] = useState(0)
    const [total,setTotal] = useState(0)

    useEffect(()=>{
        const Count = cartItems.reduce((acc,item)=> acc+ item.quantity,0)
        setCartCount(Count)
    },[cartItems])

    useEffect(()=>{
        const total = cartItems.reduce((acc,item)=>acc+ item.quantity * item.price,0)
        setTotal(total)
    },[cartItems])
    const addItemToCart = (productToAdd)=>{
        //console.log(productToAdd)
        setCartItems(addItem(cartItems,productToAdd))
       
    }

    const removeItemFromCart = (producToRemove)=>{
        setCartItems(removeItem(cartItems,producToRemove))
    }

    const removeEntireItem = (id)=>{
        setCartItems(removeItemAll(cartItems,id))
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,removeItemFromCart,removeEntireItem,total}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}