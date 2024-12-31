import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Product {
  _id: string;
  title: string;
  brand: string;
  imageUrls: string[];
  base64Images: string[];
  originalPrice: number;
  discountedPrice: number;
  category: string;
  stock: number;
  size: string;
  description: string;
  sku: string;
  material: string;
  weight: string;
  dimensions: string;
  manufacturingDate: string;
  warranty: string;
  shippingInfo: string;
  highlights: string[];
  stockAlert: number;
  lastRestocked: string;
  salesCount: number;
  createdAt: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://loop-xpress-backend.vercel.app/api/products/product/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);

        // Combine image URLs and Base64 images into a single array for display
        const combinedImages = [...(data.imageUrls || []), ...(data.base64Images || [])];
        setImages(combinedImages);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb pageName="Product Details" />
      <div className="rounded-lg shadow-lg overflow-hidden dark:bg-boxdark">
        <div className="md:flex">
          {/* Product Images Section */}
          <div className="md:w-1/2 p-6">
            <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-gray-100 dark:border-boxdark-2 h-auto sm:h-[250px] md:h-[400px] lg:h-[500px]">
              <img
                src={images[currentImageIndex]}
                alt={`${product.title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-contain bg-white  dark:bg-boxdark transition-transform duration-500 ease-in-out transform hover:scale-105"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dc651d]"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dc651d]"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-6">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${currentImageIndex === index
                        ? 'border-2 border-[#dc651d] shadow-lg scale-105'
                        : 'border-2 border-transparent hover:border-gray-300 dark:hover:border-boxdark-2'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Product Information */}
          <div className="md:w-1/2 p-8">
            {/* Basic Info Section */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div >
                    <p className="text-orange-500 dark:text-orange-500 text">{product.brand}</p>
                  </div>
                  <h1 className="text-2xl font-bold dark:text-white mt-2 w-full ">{product.title}</h1>
                </div>
              </div>

              {/* Category */}
              <div className="flex gap-4 mt-2 text text-gray-600 dark:text-gray-400">
                <p>Category: {product.category}</p>
              </div>
            </div>

            <div className="mb-6 bg-gray-50 dark:bg-boxdark-2 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-orange-600">₹{product.discountedPrice}</span>
                {product.originalPrice > product.discountedPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through ml-4">₹{product.originalPrice}</span>
                    <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inclusive of all taxes</p>
            </div>

            <div className="mb-6 overflow-hidden">
              <h2 className="text-lg font-semibold mb-3 dark:text-white">Product Highlights</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 break-words">
                {Array.isArray(product.highlights) ?
                  product.highlights.map((highlight, index) => (
                    <li key={index} className="px-2">{String(highlight)}</li>
                  ))
                  : null
                }
              </ul>
            </div>

            <div className="mb-6 overflow-hidden">
              <h2 className="text-lg font-semibold mb-3 dark:text-white">Product Description</h2>
              <p className="text-gray-600 dark:text-gray-400 break-words px-2">{product.description}</p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="bg-green-200 dark:bg-green-900/30 p-3 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400">In Stock</p>
                <p className="font-bold text-green-700 dark:text-green-300">{product.stock}</p>
              </div>
              <div className="bg-blue-50 bg-blue-900/30 p-3 rounded-lg text-center">
                <p className="text-sm text-blue-600 ">Stock Alert</p>
                <p className="font-bold text-blue-700 dark:text-blue-300">{String(product.stockAlert || 0)}</p>
              </div>
              <div className="bg-purple-300 dark:bg-purple-900/30 p-3 rounded-lg text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400">Total Sales</p>
                <p className="font-bold text-purple-700 dark:text-purple-300">{String(product.salesCount || 0)}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                className="flex-1 bg-[#dc651d] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Product
              </button>
              <button
                onClick={() => navigate('/seller/product-list')}
                className="flex-1 bg-[#24303f] dark:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
