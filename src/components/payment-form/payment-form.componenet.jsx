import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import {selectCartTotal} from '../../store/cart/cart.selector'
import {selectCurrentUser} from '../../store/user/user.selector'
import Button from "../button/button.component";
import './payment-form.styles.scss'
import { useState } from "react";

const Payment = ()=>{
    const stripe = useStripe()
    const elements = useElements()
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setProcessingPayment] = useState(false)
    const paymentHandler = async(e)=>{
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        setProcessingPayment(true)
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers:{
                'Content-Type':'applicatoin/json'
            },
            body: JSON.stringify({
                amount: amount*100,
            })
        }).then(res => res.json())
        console.log(response)
        const {paymentIntent:{client_secret}} = response;
        const paymentResult = await stripe.confirmPayment(client_secret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name: currentUser? currentUser.displayName : 'Guest',
                }
            }
        })
        setProcessingPayment(false)
        if(paymentResult.error){
            alert(paymentResult.error)
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Success')
            }
        }
    }
    return(
        <div className="paymentFormContainer">
        <form className="formContainer" onSubmit={paymentHandler}>
            <h2>Credit Card Payment:</h2>
            <CardElement className="cardElement"/>
            <Button isProcessing={isProcessingPayment}buttonType={'inverted'} >Pay now</Button>
        </form> 
        </div>
    )
}

export default Payment
