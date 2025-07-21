import React from 'react';

export default function BackDrop({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-10 backdrop-filter backdrop-blur-sm z-20"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}