import React from 'react'
import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { auth,signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
const SignIn = () => {


    // useEffect(()=>{
      
    //   const redirectFun = async  ()=>{
    //    const response = await getRedirectResult(auth)
    //     console.log(response)
    //     if(response) {
    //       const userDocRef =  createUserDocumentFromAuth(response.user)
    //     }
    //   }
    //   setTimeout(redirectFun, 5000);
    //   },[])
    
    const logGoogleUser = async ()=>{
     
      const {user} = await signInWithGooglePopup()
      const userDocRef =  createUserDocumentFromAuth(user)
    }
    // const logGoogleUserReirect = async ()=>{
     
    //   const response = await signInWithGoogleRedirect()
    //   console.log(response)
    // }
  return (
    <div>
      
      <h1>This is sign in page</h1>
      <button onClick={logGoogleUser}>
        Sing in with google popup
      </button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sing in with google Redirect
      </button> */}
      <SignUpForm />
      </div>
  )
}

export default SignIn