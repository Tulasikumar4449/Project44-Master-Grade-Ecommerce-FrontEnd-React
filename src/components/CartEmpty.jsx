import React from 'react'
import { MdArrowBack, MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function 
() {
  return (
    <div className='min-h-[600px] flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center'>
          <MdShoppingCart size={80} className="mb-4 text-slate-600" />
          <div className='text-3xl font-bold text-slate-800'>Your cart is empty</div>
          <div className='text-lg  text-slate-600 mt-3'>Add some products to get started</div>

        </div>
        <div className='mt-10'>
          <Link to="/products" 
                className='inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800'
                >
                  <MdArrowBack size={20} className="inline-block mr-2" />
                  Shop Now
          </Link>

        </div>
    </div>
  )
}
