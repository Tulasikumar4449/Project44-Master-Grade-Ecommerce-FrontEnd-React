import { Skeleton, Alert, AlertTitle } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }
    const {error: subitError} = await elements.submit();
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:5173/order-confirm',
      },
    })
    if(error){
      setErrorMessage(error.message);
      return false;

    }

  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <div className='mb-16'>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {loading ? (
        <Skeleton variant="rectangular" height={50} />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && (
            <div className='text-red-500 mt-2'>
              {errorMessage}

            </div>
          )}
        <button
          type="submit"
          className="text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-semibold disabled:opacity-50 disabled:animate-pulse hover:cursor-pointer"
          disabled={!stripe || loading}>
          {!loading ? `Pay $${Number(totalPrice).toFixed(2)}` : 'Processing...'}
        </button>
        </>
      )}
    
    </form>
    </div>
  );
};

export default PaymentForm;