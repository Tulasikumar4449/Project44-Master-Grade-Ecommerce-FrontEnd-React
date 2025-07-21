import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "../store/cartSlice";
import toast from "react-hot-toast";

export default function ItemContent({
  productId,
  productName,
  image,
  price,
  quantity,
  description,
  discount,
  specialPrice,
}) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const handleQtyIncrease = () => {
    // Check if product exists in product store
    const productInStore = products?.find((product) => product.productId === productId);

    if (!productInStore) {
      toast.error("Product not found");
      return;
    }

    // Check if product is in stock
    if (productInStore.quantity <= currentQuantity) {
      toast.error("Cannot increase quantity: Product out of stock");
      return;
    }

    // Dispatch action to increase quantity
    dispatch(increaseQuantity({ productId }));
    setCurrentQuantity(currentQuantity + 1);
  };

  const handleQtyDecrease = () => {
    // Dispatch action to decrease quantity
    dispatch(decreaseQuantity({ productId }));
    setCurrentQuantity(currentQuantity - 1);
  };

  const handleRemove = () => {
    dispatch(removeItem({ productId }));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 gap-4 md:text-md text-sm items-center border-[1px] border-slate-200">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2 p-2">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">{productName}</h3>
        </div>
        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={image}
            alt={productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />
          <div className="flex items-start gap-5 mt-3">
            <button
             onClick={handleRemove}
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:text-rose-600 hover:bg-rose-50 hover:border-rose-600 hover:cursor-pointer"
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {Number(specialPrice).toFixed(2)}
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {Number(currentQuantity * specialPrice).toFixed(2)}
      </div>
    </div>
  );
}