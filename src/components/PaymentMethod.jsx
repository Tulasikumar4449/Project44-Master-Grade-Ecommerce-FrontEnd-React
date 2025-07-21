import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentMethod } from '../store/paymentSlice';
import { createOrUpdateCart, getUsersCart } from '../store/cartSlice';

const PaymentMethod = () => {
  const paymentMethod = useSelector((state) => state.payments.paymentMethod);
  const dispatch = useDispatch();
  const { cart, cartId } = useSelector((state) => state.carts);

  useEffect(() => {
    if (cart.length > 0 && !cartId) {
      dispatch(createOrUpdateCart()).then(() => {
        dispatch(getUsersCart());
      });
    }
  }, [dispatch, cartId]);

  const paymentMethodHandler = (e) => {
    const selectedMethod = e.target.value;
    dispatch(updatePaymentMethod(selectedMethod));
  };

  return (
    <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border border-none'>
      <h1 className='text-2xl font-semibold mb-4'>Select Payment Method</h1>
      <FormControl>
        <RadioGroup
          aria-label="payment-method"
          name="paymentMethod"
          value={paymentMethod || ''}
          onChange={paymentMethodHandler}
        >
          <FormControlLabel value="Stripe" control={<Radio color="primary" />} label="Stripe" className='text-gray-700' />
          <FormControlLabel value="Paypal" control={<Radio color="primary" />} label="Paypal" className='text-gray-700' />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;