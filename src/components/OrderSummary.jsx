import React from 'react'

const OrderSummary = ({totalPrice, cart, address, paymentMethod}) => {
  return (
    <div className='constainer mx-auto px-4 mb-16'>
        <div className='flex flex-wrap '>
            <div className='w-full lg:w-8/12 pr-4'>
                <div className='space-y-4'>
                    <div className='p-4 border border-gray-100 rounded-lg shadow-lg '>
                        <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
                        <p>
                            <strong>Building Name : </strong>
                            {address?.buildingName?? 'No Building Name'}
                        </p>
                        <p>
                            <strong>City  : </strong>
                            {address?.city?? 'No City'}
                        </p>
                        <p>
                            <strong>Street  : </strong>
                            {address?.street?? 'No Street'}
                        </p>
                        <p>
                            <strong>State  : </strong>
                            {address?.state?? 'No State'}
                        </p>
                        <p>
                            <strong>ZipCode  : </strong>
                            {address?.zipCode?? 'No ZipCode'}
                        </p>
                        <p>
                            <strong>Country  : </strong>
                            {address?.country?? 'No Country'}
                        </p>
                    </div>
                    <div className='p-4 border border-gray-100 rounded-lg shadow-lg '>
                        <h2 className='text-2xl font-semibold mb-2'>Payment Method</h2>
                        <p>
                            <strong>Method : </strong>
                            {paymentMethod?? 'No Payment Method'}
                        </p>
                    </div>
                    <div className='p-4 border border-gray-100 rounded-lg shadow-lg '>
                        <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
                        <div className='space-y-2'>
                            {cart?.map((item, index) => (
                                <div key={index} className='flex items-center justify-between'>
                                    <img src={item.image} className='w-12 h-12 rounded' alt='Prodcut'></img>
                                    <div className='text-gray-500'>
                                        <p>{item.productName}</p>
                                    </div>
                                    <div className='text-gray-500'>
                                        <p>{item.quantity} x ${item.specialPrice} = ${(item.itemTotal).toFixed(2)}</p>

                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-4/12 mt-4 lg:mt-0'>
                <div className='border border-gray-100 rounded-lg p-4 shadow-lg space-y-4 '>
                    <h2 className='text-2xl font-semibold mb-2'>Order Summary</h2>
                    <div className='space-y-2'>
                        <div className='flex justify-between'>
                            <span>Products</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Tax (0%)</span>
                            <span>$0.00</span>
                        </div>
                        <div className='flex justify-between font-semibold'>
                            <span>SubTotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default OrderSummary;