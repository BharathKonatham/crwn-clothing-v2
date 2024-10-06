import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";

import Button from "../button/button.component";
import './payment-form.styles.scss'

const Payment = ()=>{
    const stripe = useStripe()
    const elements = useElements()
    const paymentHandler = async(e)=>{
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        

    }
    return(
        <div className="paymentFormContainer">
        <div className="formContainer">
        <h2>Credit Card Payment:</h2>
            <CardElement className="cardElement"/>
            <Button buttonType={'inverted'}>Pay now</Button>
        </div>
            
        </div>
    )
}

export default Payment