import React, { useEffect } from "react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearMessages } from "../store/cartSlice";
import { getProducts } from "../store/productSlice"; // Import getProducts
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { isLoading, products } = useSelector((state) => state.products);

  // Fetch products when the component mounts
  useEffect(() => {
    if (!products) {
      dispatch(getProducts()); // Fetch all products (adjust queryString as needed)
    }
  }, [dispatch, products]);

  // If cart is empty, you can dispatch an action to clear messages or set an error
  if (!cart || cart.length === 0) {
    return (
      <CartEmpty
      />
    );
  }

  // Show loading state while products are being fetched
  if (isLoading) {
    return <h1>Loading products...</h1>;
  }

  return (
    <div className="lg:px-18 sm:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <MdShoppingCart size={36} className="text-gray-700" />
          Your Cart
        </h1>
        <p className="text-gray-600 text-lg mt-2">All you selected items</p>
      </div>

      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start test-lg text-slate-800 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800">Price</div>
        <div className="justify-self-center text-lg text-slate-800">Quantity</div>
        <div className="justify-self-center text-lg text-slate-800">Total</div>
      </div>
      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item, i) => <ItemContent key={i} {...item} />)}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
        <div></div>
        <div className="flex text-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Subtotal</span>
            <span>${Number(totalPrice).toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-600">
            Shipping and taxes calculated at checkout
          </p>
          <Link to="/checkout" className="w-full flex justify-end">
            <button
              onClick={() => {}}
              className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-blue-600 text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500 hover:cursor-pointer"
            >
              <MdShoppingCart size={20} /> Checkout
            </button>
          </Link>
          <Link
            to="/products"
            className="flex gap-2 items-center mt-2 text-slate-500"
          >
            <MdArrowBack size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}