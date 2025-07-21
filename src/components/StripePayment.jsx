import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentForm from './PaymentForm';
import { getClientSecretKey } from '../store/authenticationSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const clientSecret = useSelector((state) => state.auth.clientSecret);
  const totalPrice = useSelector((state) => state.carts.totalPrice);
  const dispatch = useDispatch();

 

  useEffect(() => {
    if (!clientSecret ) {
      const data = {
        amount: Math.round(totalPrice * 100), // Convert dollars to cents
        currency: 'usd',
      };
      dispatch(getClientSecretKey(data));
    }
  }, [clientSecret]);



  return (
    <>
      {clientSecret && 
      (<Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
      </Elements>)}
    </>
  )
}

export default StripePayment;