import React, { useEffect } from 'react'
import HeroBanner from './HeroBanner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/productSlice';
import ProductCard from './ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import Loader from './Loader';

function Home() {

    const {products, isLoading, errorMessage} = useSelector((state) => state.products);

    const dispatch = useDispatch();
    

     useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

  return (
    <div className='lg:px-14 sm:px-8 px-4'>
        <div className='py-6'>
            <HeroBanner/>
        </div>

        <div className='py-5'>
            <div className='flex flex-col justify-center items-center space-y-2'>
                <h1 className='text-slate-800 text-4xl font-bold'>Products</h1>
                    <span className='text-slate-700 '>
                        Discover our handpicked selection of top-rated items just for you!
                    </span>
            </div>
            {isLoading?(<div className="flex justify-center items-center w-full h-[450px]">
                <div className="flex flex-col item-center gap-1">
                <Loader/>
                <p className="text-slate-800">Please wait.....</p>
                </div>
            </div>):errorMessage?(<div className="flex justify-center items-center h-[500px]">
                <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                <span className="text-slate-800 text-lg font-medium">{errorMessage}</span> 
            </div>):(<div className="pb-6  pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {products && products?.slice(0, 8).map((item, i)=> <ProductCard key={i} {...item}/>)}
        </div>)}
        </div>
        
    </div>
  )
}
export default Home;
