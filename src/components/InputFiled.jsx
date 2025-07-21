import React from 'react';

export default function InputField({
  label,
  id,
  type = 'text', // Default to 'text' if type is not provided
  errors = {}, // Default to empty object to prevent undefined errors
  register,
  required = false, // Default to false if not provided
  message = 'This field is required', // Default error message
  className = '', // Default to empty string
  min,
  value = '', // Default to empty string
  placeholder = '', // Default to empty string
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`font-semibold text-sm text-slate-800 ${className}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
          errors[id]?.message ? 'border-red-500' : 'border-slate-700'
        } ${className}`}
        {...register(id, {
          required: required ? { value: true, message } : false,
          minLength: min ? { value: min, message: `${label} must be at least ${min} characters long` } : undefined,
          pattern: type === 'email' ? { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } : undefined,
        })}
        defaultValue={value} // Use defaultValue instead of value to avoid controlled/uncontrolled input issues
      />
      {errors[id]?.message && (
        <p className="text-red-600 text-sm mt-0 font-semibold">{errors[id].message}</p>
      )}
    </div>
  );
}