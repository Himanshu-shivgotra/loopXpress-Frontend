import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { categories } from '../../constant/ProductData';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://loop-xpress-backend.vercel.app/api/products/product/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        if (data.manufacturingDate) {
          data.manufacturingDate = new Date(data.manufacturingDate).toISOString().split('T')[0];
        }
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'highlights') {
      setProduct({ ...product, [name]: value.split(',').map((item) => item.trim()) });
    } else if (name.startsWith('imageUrl')) {
      const index = parseInt(name.split('-')[1], 10);
      const newImageUrls = [...product.imageUrls];
      newImageUrls[index] = value;
      setProduct({ ...product, imageUrls: newImageUrls });
    } else if (name === 'manufacturingDate') {
      setProduct({ ...product, [name]: value || null });
    } else if (name === 'originalPrice' || name === 'discountedPrice') {
      // Convert price inputs to numbers
      setProduct({ ...product, [name]: value ? Number(value) : '' });
    } else {
      setProduct({ ...product, [name]: value || '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate prices before submitting
    if (Number(product.discountedPrice) > Number(product.originalPrice)) {
      toast.error('Discounted price cannot be greater than original price');
      return;
    }

    setSaving(true);
    try {
      const authToken = localStorage.getItem('authToken');

      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const existingImages = product.imageUrls.filter(url => !url.startsWith('blob:'));
      formData.append('existingImageUrls', JSON.stringify(existingImages));

      const productDataToSend = { ...product };
      delete productDataToSend.imageUrls;
      delete productDataToSend.base64Images;

      Object.keys(productDataToSend).forEach(key => {
        if (productDataToSend[key] !== null && productDataToSend[key] !== undefined) {
          formData.append(key,
            typeof productDataToSend[key] === 'object' ?
              JSON.stringify(productDataToSend[key]) :
              productDataToSend[key]
          );
        }
      });

      const response = await fetch(`https://loop-xpress-backend.vercel.app/api/products/update-product/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const data = await response.json();
      toast.success('Product updated successfully!');

      setTimeout(() => {
        navigate(`/seller/product/${id}`);
      }, 1000);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/product/${id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageUrls = [...product.imageUrls];
    const newUploadedFiles = [...uploadedFiles];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Create temporary URL for preview
      const previewUrl = URL.createObjectURL(file);
      newImageUrls.push(previewUrl);
      newUploadedFiles.push(file);
    }

    setProduct({ ...product, imageUrls: newImageUrls });
    setUploadedFiles(newUploadedFiles);
  };

  const removeUploadedImage = (index: number) => {
    const removedUrl = product.imageUrls[index];
    // Only revoke URL if it's a blob URL (temporary preview)
    if (removedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(removedUrl);
    }

    const newImageUrls = product.imageUrls.filter((_, i) => i !== index);
    const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);

    setProduct({ ...product, imageUrls: newImageUrls });
    setUploadedFiles(newUploadedFiles);
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...product.highlights];
    newHighlights[index] = value;
    setProduct({ ...product, highlights: newHighlights });
  };

  const addHighlight = () => {
    setProduct({ ...product, highlights: [...product.highlights, ''] });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = product.highlights.filter((_, i) => i !== index);
    setProduct({ ...product, highlights: newHighlights });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Edit Product" />
      <div className="max-w-full">
        <div className="bg-light-theme-bg border rounded-lg p-6 shadow-lg text-light-theme-text">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section: Product Images */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-light-theme-text">Product Images</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#dc651d] file:text-white hover:file:bg-[#dc651d]"
                  />
                  <p className="mt-3 text-sm text-gray-500">
                    * You can upload multiple images. The first image will be used as the main product image.
                  </p>
                  {product.imageUrls.length > 0 && (
                    <div className="mt-4 flex gap-4 overflow-x-auto">
                      {product.imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-lg border"
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
                  )}
                </div>
              </div>
            </section>

            {/* Section: Basic Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-light-theme-text">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Category</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.category} value={category.category}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Manufacturing Date</label>
                  <input
                    type="date"
                    name="manufacturingDate"
                    value={product.manufacturingDate}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={product.warranty}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                  />
                </div>
              </div>
            </section>

            {/* Section: Pricing & Inventory */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-light-theme-text">Pricing & Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={product.originalPrice}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Discounted Price</label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={product.discountedPrice}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Stock Alert Level</label>
                  <input
                    type="number"
                    name="stockAlert"
                    value={product.stockAlert}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section: Product Highlights */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-light-theme-text">Product Highlights</h2>
              <div className="space-y-6">
                {product.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                      className="flex-1 rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-6 py-3 bg-[#dc651d] text-white rounded-lg hover:bg-opacity-90"
                >
                  Add Highlight
                </button>
              </div>
            </section>

            {/* Section: Description */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-light-theme-text">Description</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  {/* <label className="block mb-2 text-light-theme-text font-medium">
                    Product Description
                  </label> */}
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-800 dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white px-4 py-3 focus:border-[#dc651d] outline-none"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section: Additional Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-light-theme-text">Additional Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block mb-2 text-light-theme-text font-medium">Shipping Info</label>
                  <textarea
                    name="shippingInfo"
                    value={product.shippingInfo}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white text-black dark:border-[#dc651d] dark:bg-[#24303f] dark:text-white py-3 px-4 focus:ring-2 focus:ring-[#dc651d]"
                  />
                </div>
              </div>
            </section>

            {/* Section: Submit Buttons */}
            <section className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#dc651d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;