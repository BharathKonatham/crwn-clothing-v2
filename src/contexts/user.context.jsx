import {  createContext,useEffect,useReducer } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase.utils";


//actual value you want to access
export const userContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>{}
})

export const  USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}

const userReducer = (state,action)=>{
    const {type,payload} = action
    switch (type){
        case 'SET_CURRENT_USER': {
            
            return {
                ...state, currentUser:payload
            }
        }
        default: 
        throw new Error(`never seen this ${type} before in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({children})=>{
    //const [currentUser, setCurrentUser] = useState(null)
    //
    const [{currentUser},dispatch] = useReducer(userReducer,INITIAL_STATE)

    const setCurrentUser = (user)=>{
        dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
    }
    const value= {currentUser,setCurrentUser}
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner(
            (user)=>{ 
                console.log(user)
                if(user){
                     createUserDocumentFromAuth(user)
                }
                setCurrentUser(user)
            }
        )
        return unsubscribe
    },[])

    return <userContext.Provider value={value}>{children}</userContext.Provider>
}

