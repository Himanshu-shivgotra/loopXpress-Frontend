import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../common/axiosInstance';

interface Product {
  id: number;
  title: string;
  location: string;
  quantity: number;
  // Add other product fields as needed
}

function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/inventory/');
        console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.location}</p>
            <p className="mt-2">
              Quantity: <span className="font-medium">{product.quantity}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;