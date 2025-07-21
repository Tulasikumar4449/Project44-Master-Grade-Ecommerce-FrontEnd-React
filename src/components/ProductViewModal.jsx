import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Divider } from '@mui/material';
import { useState } from 'react'
import Status from './Status';
import { MdDone } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

function ProductViewModal({open, setOpen, product, isAvailable}) {

  const { productId,productName, image, description, quantity, price, discount, specialPrice } = product;
  
  const handleClickOpen = ()=>{
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }



  return (
    <>
     

      <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={handleClose} __demoMode>
        <DialogBackdrop className="fixed inset-0   bg-slate-900/50"/>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full md:max-w-[620px] md:min-w-[620px] w-full "
            >
                {image && <div className='flex justify-center aspect-[3/2]'>
                        <img src={image} alt={productName} />
                    </div>}
                <div className='px-6 pt-10 pb-2 '>
                    <DialogTitle as="h1" className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
                        {productName}
                    </DialogTitle>
                    <div className='space-y-2  text-gray-700  pb-4'>
                      <div className="flex items-center justify-between gap-2">
                        {specialPrice?( <div className="p-4 flex flex-col">
                            <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                            <span className="text-xl font-bold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
                        </div>):( 
                            <span className="text-xl font-bold text-slate-700 ">${Number(price).toFixed(2)}</span>
                        )}

                        {isAvailable?
                        (<div>
                        <Status
                          text='InStock'
                          icon={ MdDone }
                          bg='bg-teal-200'
                          color='text-teal-900'
                          />
                        </div>):
                        (<div>
                        <Status
                          text='Out of Stock'
                          icon={ MdClose }
                          bg='bg-rose-200'
                          color='text-rose-700'
                        /></div>)}
                      </div>
                        <Divider/>
                        <p>{description}</p>
                    </div>

                </div>

            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setOpen(false)} 
                type='button'
                className="me-8 mb-2 inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 cursor-pointer"
              >
                Close
              </button>
            </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ProductViewModal;