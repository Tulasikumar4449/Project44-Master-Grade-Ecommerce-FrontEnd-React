import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk, clearMessages } from "../store/cartSlice";
import toast from "react-hot-toast";


const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice
})=>{

    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState({});
    const dispatch = useDispatch();
    const { errorMessage, successMessage } = useSelector((state) => state.carts);
    const isAvailable = quantity > 0;

    const handleProductView = (product)=>{
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    }

    const handleAddToCart = () => {
        dispatch(addToCartThunk({ 
          productId, productName, image, description, 
          quantity, price, discount, specialPrice 
        }));
        
        // Clear messages after 3 seconds
        setTimeout(() => {
          dispatch(clearMessages());
        }, 3000);
      };
    
    return (
        <div>
            <div className="rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                <div onClick={()=>{
                    handleProductView({productId,productName, image, description, quantity, price, discount, specialPrice})
                }} className="w-full overflow-hidden aspect-[3/2]">
                    <img src={image} alt={productName} className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"/>

                </div>
                <div className="p-4 ">
                    <h2 onClick={()=>{
                        handleProductView({productId,productName, image, description, quantity, price, discount, specialPrice})
                    }}  className="text-lg font-semibold mb-2 cursor-pointer" >{productName}</h2>
                </div>
                <div className="min-h-20 max-h-20 p-4 overflow-hidden">
                    <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
                </div>
                <div className="flex items-center justify-between p-1">
                    {specialPrice?( <div className="p-4 flex flex-col">
                        <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                        <span className="text-xl font-bold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
                    </div>):( 
                        <span className="text-gray-700 ">${Number(price).toFixed(2)}</span>
                    )}
                   
                   <button
                   
                   onClick={handleAddToCart}
       className={`bg-blue-500 ${isAvailable ? "hover:bg-blue-600" : "bg-gray-400"} 
                    text-white px-1 py-2 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center ${isAvailable ? "cursor-pointer" : "cursor-not-allowed"}`}>
                        <FaShoppingCart className="mr-2"/> {isAvailable ? "Add to cart" : "Out of stock"}
                         </button>
                   
                </div>
               
                <ProductViewModal product={selectedViewProduct} open={openProductViewModal} setOpen={setOpenProductViewModal} isAvailable={isAvailable}/>

            </div>
            
        </div>
    );
}

export default ProductCard;