import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';
import ProductCard from './ProductCard'; // Import the updated ProductCard
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
    quantity: number;
    imageUrls: string[];
  };
}

function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/inventory/');
        setProducts(response.data);
        localStorage.setItem('isWarehouseInventory', response?.data[0]?.isWarehouseInventory?.toString());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axiosInstance.get('/api/inventory/cart/count');
        setCartCount(response.data.count);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    
    // Add message listener for cart count updates
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'refreshCartCount') {
        fetchCartCount();
      }
    };

    window.addEventListener('message', handleMessage);
    fetchCartCount();
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update pagination to use filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mx-auto p-6 bg-navy-900 text-black-200">
      <div className="mb-8">
        <div className="flex text-orange-500 flex-col sm:flex-col md:flex-row justify-between items-center bg-navy-800 p-6 rounded-lg shadow-md gap-4">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 rounded-lg bg-navy-700 text-black border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <div className="relative">
              <Link to="/inventory/cart">
                <FaShoppingCart size={26} className='text-orange-500'/>
              </Link>
              {cartCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((productData, index) => (
          <ProductCard key={`${productData._id}-${index}`} ProductData={productData} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-6 py-2.5 bg-navy-700 text-orange-500 rounded-lg disabled:opacity-500  hover:bg-navy-600 border border-orange-500 font-medium transition-all duration-200"
        >
          Previous
        </button>
        <span className="text-orange-500 font-semibold mx-4 text-lg">
          Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)))
          }
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          className="mx-2 px-6 py-2.5 bg-navy-700 text-orange-500 rounded-lg disabled:opacity-500 hover:bg-navy-600 border border-orange-500 font-medium transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Inventory;