import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils"
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields

    console.log(formFields)
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
            const userDocRef = createUserDocumentFromAuth({...user,displayName})
            resetFormFields()
            alert('user successfully created')
            //console.log(userDocRef)
        }catch(error){
            if(error.code == 'auth/email-already-in-use'){
                console.log(error.message)
                alert('email already in use')
            }else{
                console.log(error)
            }
            
        }
        
        
    }
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>

                {/* Name */}
                <label htmlFor="Name">display Name</label>
                <input type="text" title="Name" required name="displayName" value={displayName} onChange={handlChange}/>
                 {/* Email */}
                <label htmlFor="Email">Email</label>
                <input type="email" title="Email"required name="email" value={email} onChange={handlChange}/>
                 {/* Password */}
                <label htmlFor="Password">Password</label>
                <input type="password" title="Password" required name="password" value={password} onChange={handlChange}/>
                 {/* Confirm Password */}
                <label htmlFor="confirmPassword" >Confrim Password</label>
                <input type="password" title="confirmPassword"required name="confirmPassword" value={confirmPassword} onChange={handlChange}/>
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUpForm