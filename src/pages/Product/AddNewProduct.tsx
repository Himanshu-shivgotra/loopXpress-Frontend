import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useUserInfo from '../../hooks/useUserInfo';
import { ProductData, subcategorySizeMap, categories, sizeOptionsMap } from '../../constant/ProductData';

type SizeType = 'clothing' | 'shoes' | 'equipment' | 'none';

interface AddNewProductProps {
  onProductAdded: () => void;
}

const AddNewProduct = ({ onProductAdded }: AddNewProductProps) => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo(); // Fetch user info
  const [productData, setProductData] = useState<ProductData>({
    name: userInfo?.personalDetails?.fullName || '', // Initialize username
    title: '',
    brand: '',
    imageUrls: [],
    originalPrice: '',
    discountedPrice: '',
    category: '',
    subcategory: '',
    quantity: '',
    size: '',
    description: '',
    material: '',
    weight: '',
    dimensions: '',
    manufacturingDate: '',
    warranty: '',
    shippingInfo: '',
    highlights: [''],
    stockAlert: ''
  });

  const [highlightInput, setHighlightInput] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'category') {
      setProductData({
        ...productData,
        category: value,
        size: '',
        subcategory: ''
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const addHighlight = () => {
    setProductData({
      ...productData,
      highlights: [...productData.highlights, '']
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = productData.highlights.filter((_, i) => i !== index);
    setProductData({
      ...productData,
      highlights: newHighlights
    });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...productData.highlights];
    newHighlights[index] = value;
    setProductData({
      ...productData,
      highlights: newHighlights
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    // Append all text fields
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'imageUrls' && key !== 'highlights') {
        formData.append(key, value.toString());
      }
    });

    // Append highlights as JSON string
    formData.append('highlights', JSON.stringify(productData.highlights.filter(h => h.trim() !== '')));

    // Append each file
    uploadedFiles.forEach((file) => {
      formData.append('images', file);
    });

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch('http://localhost:5000/api/products/add-product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        if (data.details) {
          const errorMessage = Array.isArray(data.details)
            ? data.details.map((err: any) => `${err.field}: ${err.message}`).join('\n')
            : data.details;
          throw new Error(errorMessage);
        }
        throw new Error(data.message || 'Failed to add product');
      }

      // Clean up preview URLs
      productData.imageUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });

      toast.success('Product added successfully!');
      setTimeout(() => {
        if (onProductAdded) {
          onProductAdded();
        }
      }, 1500); // 1.5 second delay

    } catch (error) {
      console.error('Error details:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...productData.imageUrls];
    newImageUrls[index] = value;
    setProductData({
      ...productData,
      imageUrls: newImageUrls
    });
  };

  const addImageUrl = () => {
    setProductData({
      ...productData,
      imageUrls: [...productData.imageUrls, '']
    });
  };

  const removeImageUrl = (index: number) => {
    if (productData.imageUrls.length > 1) {
      const newImageUrls = productData.imageUrls.filter((_, i) => i !== index);
      setProductData({
        ...productData,
        imageUrls: newImageUrls
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);

    // Create temporary preview URLs
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setProductData({
      ...productData,
      imageUrls: [...productData.imageUrls, ...newImageUrls],
    });
  };

  const removeUploadedImage = (index: number) => {
    // Clean up blob URL if it exists
    const removedUrl = productData.imageUrls[index];
    if (removedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(removedUrl);
    }

    // Remove from both arrays
    const newImageUrls = productData.imageUrls.filter((_, i) => i !== index);
    const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);

    setProductData({
      ...productData,
      imageUrls: newImageUrls,
    });
    setUploadedFiles(newUploadedFiles);
  };


  const renderSizeField = () => {
    const sizeType = subcategorySizeMap[productData.subcategory] || 'none';

    if (sizeType === 'none') return null;

    return (
      <div>
        <label className="mb-2.5 block text-white">Size</label>
        {sizeOptionsMap[sizeType] && (
          <select
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full rounded border-[1.5px]  border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
            required
          >
            <option value="">Select Size</option>
            {sizeOptionsMap[sizeType].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  const renderSubcategoryField = () => {
    const selectedCategory = categories.find(category => category.category === productData.category);
    if (!selectedCategory) return null;

    return (
      <div>
        <label className="mb-2.5 block text-white">Subcategory</label>
        <select
          name="subcategory"
          value={productData.subcategory}
          onChange={handleChange}
          className="w-full rounded border-[1.5px]  border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
          required
        >
          <option value="">Select Subcategory</option>
          {selectedCategory.subcategories.map(subcategory => (
            <option key={subcategory.value} value={subcategory.value}>
              {subcategory.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Add New Product" />

      <div className="max-w-full bg-white text-black dark:bg-[#24303f] dark:text-white">
        <div className="border rounded-lg p-6 shadow-lg bg-white text-black dark:bg-[#24303f] dark:text-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <h3 className="mb-2 text-2xl font-bold text-orange-500">
                {userInfo?.personalDetails?.fullName ? userInfo?.personalDetails?.fullName.charAt(0).toUpperCase() + userInfo?.personalDetails?.fullName.slice(1) : 'Name not available'}
              </h3>
            </div>

            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div className="col-span-full">
                  <label className="mb-2.5 block text-black dark:text-white">Product Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                  />
                  <p className="mt-2 text-sm text-gray-300">
                    * You can upload multiple images. First image will be used as the main product image.
                  </p>
                  {productData && (
                    <div className="mt-4 overflow-x-auto scrollbar">
                      <div className="flex gap-4 pb-2">
                        {productData.imageUrls.map((url, index) => (
                          <div key={index} className="relative flex-shrink-0 w-32">
                            <img
                              src={url}
                              alt={`Uploaded Preview ${index + 1}`}
                              className="h-32 w-32 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeUploadedImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Category</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.category} value={category.category}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {renderSubcategoryField()}
                {renderSizeField()}
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Pricing & Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={productData.originalPrice}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Discounted Price</label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Stock Alert Level</label>
                  <input
                    type="number"
                    name="stockAlert"
                    value={productData.stockAlert}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Manufacturing Date</label>
                  <input
                    type="date"
                    name="manufacturingDate"
                    value={productData.manufacturingDate}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={productData.warranty}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                  />
                </div>
              </div>
            </div>

            {/* Product Highlights with original styling */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Product Highlights</h2>
              <div className="space-y-4">
                {productData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                      className="flex-1 rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlight}
                  className="w-full px-4 py-2 bg-[#dc651d] text-white rounded hover:bg-opacity-90"
                >
                  Add Highlight
                </button>
              </div>
            </div>

            {/* Description and Shipping */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Description & Shipping</h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Product Description</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Shipping Information</label>
                  <textarea
                    name="shippingInfo"
                    value={productData.shippingInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded border-[1.5px] border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-5 outline-none transition focus:border-[#dc651d]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-4 rounded-md transition-colors bg-[#dc651d] text-white dark:text-white hover:bg-opacity-90 disabled:opacity-70"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;