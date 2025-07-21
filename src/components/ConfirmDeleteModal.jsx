import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConfirmDeleteModal = ({ open, setOpen, onConfirm }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-sm mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Confirm Delete
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 text-slate-800 font-medium rounded hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
          <div className="absolute right-4 top-2">
            <button onClick={() => setOpen(false)} type="button" className="cursor-pointer">
              <FaTimes size={20} className="text-slate-700" />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;