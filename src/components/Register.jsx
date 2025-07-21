import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputFiled';
import { registerUser } from '../store/registerSlice';
import { Spinners } from './Spinners';

export const Register = () => {

 
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onTouched" });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await dispatch(registerUser({ data })).unwrap();
      reset();
      navigate("/login");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      reset();
    }
  };
  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(registerHandler)}
        className='sm:w-[450px] w-[360px] shadow-md bg-white py-8 sm:px-8 px-4 rounded-md'
      >
        <div className='flex flex-col items-center justify-center space-y-4'>
          <FaUserPlus size={30} className='text-slate-800 text-5xl' />
          <h1 className='text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold'>
            Register Here
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
            min={6}
            type='password'
            message='*Password is required'
            placeholder='Enter your Password'
            register={register}
            errors={errors}
          />
          <InputField
            label='Email'
            required
            id='email'
            type='email'
            message='*Email is required'
            placeholder='Enter your Email'
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className='bg-gradient-to-r from-purple-600 to-red-500 flex gap-2 items-center justify-center font-semibold text-white py-2 rounded-md w-full hover:text-slate-400 transition-colors duration-100 my-4'
        >
          {loader ? <><Spinners/> Loading...</> : <>Register</>}
        </button>
        <p className='text-center'>
          Don't have an account?{' '}
          <Link to='/login'>
            <span className='text-indigo-600 cursor-pointer underline'>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
