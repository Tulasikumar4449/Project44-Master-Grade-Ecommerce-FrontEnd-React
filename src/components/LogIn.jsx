import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
import InputField from './InputFiled'; // Ensure correct path
import { useDispatch } from 'react-redux';
import { getLoginDetails } from '../store/authenticationSlice';
import { Spinners } from './Spinners';

export default function LogIn() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onTouched" });

  const loginHandler = async (data) => {
    setLoader(true); // Start loader
    try {
      const result = await dispatch(getLoginDetails({ data })).unwrap(); // Unwrap the thunk promise
      reset(); // Reset form on success
      navigate("/"); // Navigate to home on success
      setLoader(false); // Stop loader
    } catch (error) {
      setLoader(false); // Stop loader on error
      reset(); // Reset form on Failure
      // Error toasts are handled in the thunk, so no need to add here unless you want additional UI feedback
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className='sm:w-[450px] w-[360px] shadow-md bg-white py-8 sm:px-8 px-4 rounded-md'
      >
        <div className='flex flex-col items-center justify-center space-y-4'>
          <AiOutlineLogin size={30} className='text-slate-800 text-5xl' />
          <h1 className='text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold'>
            Login Here
          </h1>
        </div>
        <hr className='mt-2 mb-5 text-slate-200' />
        <div className='flex flex-col gap-4'>
          <InputField
            label='UserName'
            required
            id='userName'
            type='text'
            message='*Username is required'
            placeholder='Enter your username'
            register={register}
            errors={errors}
          />
          <InputField
            label='Password'
            required
            id='password'
            type='password'
            message='*Password is required'
            placeholder='Enter your Password'
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className='bg-gradient-to-r from-purple-600 to-red-500 flex gap-2 items-center justify-center font-semibold text-white py-2 rounded-md w-full hover:text-slate-400 transition-colors duration-100 my-4'
        >
          {loader ? <><Spinners/> Loading...</> : <>Login</>}
        </button>
        <p className='text-center'>
          Don't have an account?{' '}
          <Link to='/signup'>
            <span className='text-indigo-600 cursor-pointer underline'>Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
}