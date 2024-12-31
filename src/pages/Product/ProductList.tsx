import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  title: string;
  brand: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  stock: number;
  imageUrls: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://loop-xpress-backend.vercel.app/api/products/my-products', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <span>Are you sure you want to delete this product?</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleConfirmDelete(id);
              toast.dismiss(t.id);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`https://loop-xpress-backend.vercel.app/api/products/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter((product) => product._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  // Pagination Logic
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <div
              key={index}
              className="h-60 bg-gray-200 rounded-md animate-pulse shadow-md"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600 text-lg">No products found.</p>
        <Link
          to="/add-new-product"
          className="mt-4 inline-block px-6 py-3 text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 transition"
        >
          Add Your First Product
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-navy-900 text-black-200">
      <div className="mb-8">
        <div className="flex text-orange-500 flex-col sm:flex-col md:flex-row justify-between items-center bg-navy-800 p-6 rounded-lg shadow-md gap-4">
          <h1 className="text-3xl font-bold">My Products</h1>
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-navy-700 text-black border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <Link
            to="/add-new-product"
            className="w-full md:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition text-center"
          >
            Add New Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-700 rounded-lg shadow-md p-2 flex flex-col bg-navy-800 hover:shadow-xl hover:transform hover:scale-105 transition duration-300"
          >
            <img
              src={product.imageUrls[0]}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-black-100">
              {product.title}
            </h2>
            <p className="text-black-300 mb-2"> {product.brand}</p>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-orange-400 font-bold">₹{product.discountedPrice}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-black-400 mb-4">
              <span>{product.category}</span>
              <span>Stock: {product.stock}</span>
            </div>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                Details
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))
          }
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          className="mx-2 px-6 py-2.5 bg-navy-700 text-orange-500 rounded-lg disabled:opacity-500 hover:bg-navy-600 border border-orange-500 font-medium transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
