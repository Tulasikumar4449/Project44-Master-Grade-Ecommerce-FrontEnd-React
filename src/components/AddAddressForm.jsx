import React, { useEffect, useState } from 'react';
import InputField from './InputFiled';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Spinners } from './Spinners';
import { addUpdatedUserAddress, getUserAddress } from '../store/authenticationSlice';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: 'onTouched' });

  const onSaveAddressHandler = async (data) => {
    console.log('Form submitted');
    setLoader(true); // Start loader

    try {
      console.log('Submitting address data:', { data, addressId: address?.addressId });
      // Pass both data and addressId (if available) to the thunk
      await dispatch(addUpdatedUserAddress({ data, addressId: address?.addressId })).unwrap(); // Add or update address
      await dispatch(getUserAddress()).unwrap(); // Fetch updated addresses
      reset(); // Reset form
      setLoader(false); // Stop loader
      setOpenAddressModal(false); // Close modal
    } catch (error) {
      setLoader(false); // Stop loader
      reset(); // Reset form
      console.error('Error adding/updating address:', error);
      // Error toasts are handled in the thunk
    }
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue('buildingName', address.buildingName);
      setValue('city', address.city);
      setValue('state', address.state);
      setValue('zipCode', address.zipCode);
      setValue('country', address.country);
      setValue('street', address.street);
    }
  }, [address, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSaveAddressHandler)}>
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard size={30} className="text-slate-800 text-5xl mr-2" />
          {!address?.addressId ? 'Add Address' : 'Update Address'}
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            min={5}
            type="text"
            message="*Building Name is required"
            placeholder="Enter Building Name"
            register={register}
            errors={errors}
          />
          <InputField
            label="City"
            required
            id="city"
            min={4}
            type="text"
            message="*City is required"
            placeholder="Enter City"
            register={register}
            errors={errors}
          />
          <InputField
            label="State"
            required
            id="state"
            min={2}
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />
          <InputField
            label="Pincode"
            required
            id="zipCode"
            min={6}
            type="text"
            message="*Pincode is required"
            placeholder="Enter Pincode"
            register={register}
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            min={5}
            type="text"
            message="*Street is required"
            placeholder="Enter Street"
            register={register}
            errors={errors}
          />
          <InputField
            label="Country"
            required
            id="country"
            min={2}
            type="text"
            message="*Country is required"
            placeholder="Enter Country"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className="bg-gradient-to-r from-purple-600 to-red-500 flex gap-2 items-center justify-center font-semibold text-white py-2 rounded-md w-full hover:text-slate-400 transition-colors duration-100 my-4 cursor-pointer"
        >
          {loader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>{!address?.addressId ? 'Save' : 'Update'}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;