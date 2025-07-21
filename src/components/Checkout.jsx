import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddress } from '../store/authenticationSlice';
import toast from 'react-hot-toast';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import PaypalPayment from './PaypalPayment';
import StripePayment from './StripePayment';

const Checkout = () => {
    const dispatch = useDispatch();
    const address = useSelector((state) => state.auth.address);
    const selectedUserCheckoutAddress = useSelector((state) => state.auth.selectedUserCheckoutAddress);

    const {totalPrice, cart} = useSelector((state) => state.carts);


    // Fetch user address on component mount
    useEffect(() => {
        dispatch(getUserAddress());
    }, [dispatch]);

    const [activeState, setActiveState] = React.useState(0);
    const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];
    const paymentMethod = useSelector((state) => state.payments.paymentMethod);
    const orderSummary = true;
    const payment = false;

    // Ref to track shown toasts
    const toastShownRef = useRef({
        address: false,
        paymentMethod: false,
        orderSummary: false,    
        payment: false,
    });

    const isDisabled = (
        (activeState === 0 && selectedUserCheckoutAddress == null) ||
        (activeState === 1 && paymentMethod === null) ||
        (activeState === 2 && orderSummary === false) ||
        (activeState === 3 && payment === false) ||
        (activeState === steps.length)
    );

    // Trigger toast only when conditions change and toast hasn't been shown
    useEffect(() => {
        if (isDisabled) {
            if (activeState === 0 && selectedUserCheckoutAddress == null && !toastShownRef.current.address) {
                toast.error("Please Select Address");
                toastShownRef.current.address = true;
            } else if (activeState === 1 && paymentMethod === false && !toastShownRef.current.paymentMethod) {
                toast.error("Please Select Payment Method");
                toastShownRef.current.paymentMethod = true;
            } else if (activeState === 2 && orderSummary === false && !toastShownRef.current.orderSummary) {
                toast.error("Please Select Order Summary");
                toastShownRef.current.orderSummary = true;
            } else if (activeState === 3 && payment === false && !toastShownRef.current.payment) {
                toast.error("Please Select Payment");
                toastShownRef.current.payment = true;
            }
        } else {
            // Reset toast flags when conditions are no longer met
            toastShownRef.current = {
                address: false,
                paymentMethod: false,
                orderSummary: false,
                payment: false,
            };
        }
    }, [activeState, selectedUserCheckoutAddress, paymentMethod, orderSummary, payment]);

    return (
        <div className='py-14 min-h-[calc(100vh-100px)]'>
            <Stepper activeStep={activeState} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className='mt-5'>
                {activeState === 0 && <AddressInfo address={address} />}
                {activeState === 1 && <PaymentMethod />}
                {activeState === 2 && <OrderSummary totalPrice={totalPrice} cart={cart} address={selectedUserCheckoutAddress} paymentMethod={paymentMethod}/>}
                {activeState === 3 &&
                <>
                    {paymentMethod==='Stripe'? <StripePayment /> : <PaypalPayment />}
                
                </>}
                
                
            </div>
            <div
                className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 right-0 w-full py-4 border-slate-200'
                style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)' }}
            >
                <Button
                    variant='contained'
                    disabled={activeState === 0}
                    color='primary'
                    onClick={() => setActiveState(activeState - 1)}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveState(activeState + 1)}
                    disabled={isDisabled}
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default Checkout;