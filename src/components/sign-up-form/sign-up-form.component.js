import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button from "../button/button.component"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }
    const handlChange = (event)=>{
        const {name,value} = event.target
        setFormFields({
            ...formFields,
            [name]:value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert("passwords doesn't math")
            return
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password)
            //console.log(user)
            await createUserDocumentFromAuth({...user,displayName})
            resetFormFields()
            alert('user successfully created')
            //console.log(userDocRef)
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                console.log(error.message)
                alert('email already in use')
            }else{
                console.log(error)
            }
            
        }
        
        
    }
    return (
        
    
            <div className="sign-up-container">
                <h2>Don't have an account?</h2>
                <span >Sign up with your email and password</span>
                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <FormInput 
                        label={'Display Name'}
                        type='text'
                        required
                        onChange={handlChange}
                        name='displayName'
                        value={displayName}
                    />
                    
                    {/* Email */}
                    <FormInput 
                        label={'Email'}
                        type='email'
                        required
                        onChange={handlChange}
                        name='email'
                        value={email}
                    />
                    {/* Password */}
                    <FormInput 
                        label={'Password'}
                        type='password'
                        required
                        onChange={handlChange}
                        name='password'
                        value={password}
                    />
                    {/* Confirm Password */}
                    <FormInput 
                        label={'Confirm Password'}
                        type='password'
                        required
                        onChange={handlChange}
                        name='confirmPassword'
                        value={confirmPassword}
                    />
                
                    <Button type="submit">Sign Up</Button>
                </form>
            </div>  
    )
}
export default SignUpForm