import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance';
import toast from 'react-hot-toast';

interface Product {
    _id: string;
    quantity: number;
    location: string;
    isWarehouseInventory: boolean;
    product: {
    _id: string;
      title: string;
      brand: string;
      originalPrice: number;
      discountedPrice: number;
      category: string;
      subcategory: string;
      quantity: number;
      imageUrls: string[];
    };
  }
interface Props {
  ProductData: Product;
}
const ProductCard = ({ ProductData }: Props) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/product/${ProductData?.product?._id}`);
    };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const authToken = localStorage.getItem('authToken');
       await axiosInstance.post(
        '/api/inventory/add-to-cart',
        {
          productId: ProductData.product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        }
      );
      toast.success('Product added to cart successfully!');
      
      // Refresh cart count in parent component
      if (window.parent) {
        window.parent.postMessage('refreshCartCount', '*');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };


  return (
    <div
      onClick={handleCardClick}
      className="bg-navy-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-700 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={ProductData?.product?.imageUrls?.[0]}
          alt={ProductData?.product?.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        {/* Discount Badge */}
        {ProductData?.product?.discountedPrice < ProductData?.product?.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded-full">
            {Math.round(
              ((ProductData?.product?.originalPrice - ProductData?.product?.discountedPrice) /
                ProductData?.product?.originalPrice) *
                100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-black-100 mb-2 truncate">
            {ProductData?.product?.title}
          </h2>
          <p className="text-sm text-black-300 mb-2">{ProductData?.product?.brand}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400">★★★★☆</span>
            <span className="text-sm text-black-400">(123 reviews)</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-orange-500">
              ₹{ProductData?.product?.discountedPrice}
            </span>
            {ProductData?.product?.discountedPrice < ProductData?.product?.originalPrice && (
              <span className="text-sm text-black-400 line-through">
                ₹{ProductData?.product?.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="mb-4">
            <div className="w-full bg-navy-700 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(ProductData.quantity / 100) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-black-400 mt-1 block">
              {ProductData.quantity} items left
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2 mt-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;