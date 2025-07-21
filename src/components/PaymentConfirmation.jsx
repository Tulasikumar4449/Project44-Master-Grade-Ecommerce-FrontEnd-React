import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { stripePaymentConfirmation } from '../store/cartSlice';


const PaymentConfirmation = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch  = useDispatch();
    const {cart} = useSelector((state) => state.carts);
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    const loading = !paymentIntent || !clientSecret || !redirectStatus;
    const jsonString = localStorage.getItem("selectedUserCheckoutAddress");
    const selectedUserCheckoutAddress = JSON.parse(jsonString)
    const jsonString2 = localStorage.getItem("paymentMethod");
    const paymentMethod = JSON.parse(jsonString2);

    useEffect(() => {

        if(paymentIntent && clientSecret && redirectStatus && cart && cart.length > 0){
            console.log("Inside UseReff-----")
            console.log(selectedUserCheckoutAddress);
            console.log(paymentMethod);
            console.log(selectedUserCheckoutAddress.addressId);

            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: paymentMethod,
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment successful"
              }
            dispatch(stripePaymentConfirmation(sendData)); 
           
        }

    }, [paymentIntent, clientSecret, redirectStatus]);

  return (
    <div className='min-h-screen flex justify-center items-center'>
        {loading ? (<div className='max-w-xl mx-auto'>
            <Skeleton variant="rectangular" height={400} />

        </div>) : 
        (<div className='p-8 rounded-lg shadow-lg text-center max-w-md mx-auto '>
            <div className='text-green-500 mb-4 flex justify-center'>
                <FaCheckCircle size={40}/>

            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'> Payment Successful!</h2>
            <p>Thank you for your purchase! Your payment was Successful, and we're Processing your Order.</p>

        </div>)
        }

    </div>
  )
}

export default PaymentConfirmation;