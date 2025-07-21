import React, { useState } from 'react';
import { FaBuilding, FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAddress, selectUserCheckoutAddress } from '../store/authenticationSlice';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const selectedUserCheckoutAddress = useSelector((state) => state.auth.selectedUserCheckoutAddress);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  const onEditButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setAddressToDelete(address);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (addressToDelete?.addressId) {
      try {
        await dispatch(deleteUserAddress(addressToDelete.addressId)).unwrap();
        setOpenConfirmModal(false);
        setAddressToDelete(null);
      } catch (error) {
        console.error('Error deleting address:', error);
        // Error toasts are handled in the thunk
      }
    }
  };

  return (
    <div className="space-y-2">
      {addresses.map((address, index) => (
        <div
          key={index}
          onClick={() => handleAddressSelection(address)}
          className={`p-4 border rounded-md cursor-pointer relative ${
            selectedUserCheckoutAddress === address
              ? 'bg-green-100 text-green-800'
              : 'bg-white text-gray-800'
          }`}
        >
          <div className="flex items-start">
            <div className="space-y-1">
              <div className="flex items-center">
                <FaBuilding size={14} className="mr-2 text-slate-600" />
                <p className="font-semibold">{address.buildingName}</p>
                {selectedUserCheckoutAddress === address && (
                  <FaCheckCircle size={14} className="ml-2 text-green-600" />
                )}
              </div>
              <div className="flex items-center">
                <MdLocationCity size={17} className="mr-2 text-slate-600" />
                <p>{address.street}</p>
              </div>
              <div className="flex items-center">
                <MdLocationCity size={17} className="mr-2 text-slate-600" />
                <p>
                  {address.city}, {address.state}
                </p>
              </div>
              <div className="flex items-center">
                <MdPinDrop size={17} className="mr-2 text-slate-600" />
                <p>{address.zipCode}</p>
              </div>
              <div className="flex items-center">
                <MdPublic size={17} className="mr-2 text-slate-600" />
                <p>{address.country}</p>
              </div>
            </div>
            <div className="flex gap-3 absolute top-4 right-2">
              <button onClick={() => onEditButtonHandler(address)}>
                <FaEdit size={20} className="text-teal-700" />
              </button>
              <button onClick={() => onDeleteButtonHandler(address)}>
                <FaTrash size={20} className="text-rose-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <ConfirmDeleteModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AddressList;