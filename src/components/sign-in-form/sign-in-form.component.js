import { useState } from "react"
import { signInWithGooglePopup,signUserWithEmailAndPassword } from "../../utils/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button from "../button/button.component"


const SignInForm = ()=>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const {user} = await signUserWithEmailAndPassword(email,password)
            setEmail('')
            setPassword('')
        }catch(error) {
             if(error.code === 'auth/invalid-credential'){
                alert('Invalid Credentials')
             }
             else{
                console.log(error)
             }
           

            }
        
           
    }
    const logGoogleUser = async ()=>{
        await signInWithGooglePopup()
      }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <form onSubmit={handleSubmit}>

                    {/* Email */}
                <FormInput 
                    label={'Email'}
                    type='email'
                    required
                    onChange={(e)=>{setEmail(e.target.value)}}
                    name='email'
                    value={email}
                />
                {/* Password */}
                <FormInput 
                    label={'Password'}
                    type='password'
                    required
                    onChange={(e)=>{setPassword(e.target.value)}}
                    name='password'
                    value={password}
                />
                <div className="buttons-container">
                    <Button type='submit'> Sing in </Button>
                    <Button type='button'onClick={logGoogleUser} buttonType="google"> 
                    google sign in </Button>
                </div>
            </form>
        </div>  
    );
}
export default SignInForm