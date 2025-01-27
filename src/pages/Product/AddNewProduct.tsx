import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useUserInfo from '../../hooks/useUserInfo';
import { ProductData, subcategorySizeMap, categories, sizeOptionsMap } from '../../constant/ProductData';
import axiosInstance from '../../common/axiosInstance';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { ChromePicker } from 'react-color';
import { colornames } from 'color-name-list';
import nearestColor from 'nearest-color';

interface AddNewProductProps {
  onProductAdded: () => void;
}

interface ColorInput {
  name: string;
  hex: string;
}

const AddNewProduct = ({ onProductAdded }: AddNewProductProps) => {

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
    stockAlert: '',
    colors: [],
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorInputs, setColorInputs] = useState<ColorInput[]>([{ name: '', hex: '' }]);
  const [showColorPicker, setShowColorPicker] = useState<number | null>(null);

  // Create the color mapping object and nearest color finder
  const colors = colornames.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
  const nearest = nearestColor.from(colors);

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

  const getClosestColorName = (hex: string): string => {
    try {
      // Get the nearest color name
      const result = nearest(hex);
      // The result will be the name of the closest matching color
      return result.name || 'Custom Color';
    } catch (error) {
      console.error('Error finding color name:', error);
      return 'Custom Color';
    }
  };

  const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
    const newColorInputs = [...colorInputs];
    newColorInputs[index] = {
      ...newColorInputs[index],
      [field]: value
    };

    // If hex color is changed, automatically set the color name
    if (field === 'hex') {
      const colorName = getClosestColorName(value);
      newColorInputs[index].name = colorName.charAt(0).toUpperCase() + colorName.slice(1);
    }

    setColorInputs(newColorInputs);
  };

  const handleColorSubmit = (index: number) => {
    if (colorInputs[index].name && colorInputs[index].hex) {
      const newColorInputs = [...colorInputs];
      // Add a new empty color input
      setColorInputs([...newColorInputs, { name: '', hex: '' }]);
      setShowColorPicker(null);
    }
  };

  const removeColorInput = (index: number) => {
    const newColorInputs = colorInputs.filter((_, i) => i !== index);
    setColorInputs(newColorInputs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    // Append all text fields
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'imageUrls' && key !== 'highlights' && key !== 'colors') {
        formData.append(key, value.toString());
      }
    });

    // Append highlights as JSON string
    formData.append('highlights', JSON.stringify(productData.highlights.filter(h => h.trim() !== '')));

    // Filter out the last empty color input and any invalid colors
    const validColors = colorInputs
      .filter(color => color.name.trim() !== '' && color.hex.trim() !== '')
      .map(color => ({
        name: color.name,
        hex: color.hex
      }));

    // Append colors as JSON string
    formData.append('colors', JSON.stringify(validColors));

    // Append each file
    uploadedFiles.forEach((file) => {
      formData.append('images', file);
    });

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axiosInstance.post('/api/products/add-product',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
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
      const errorMessage = error?.response?.data?.error || '';
      const cleanedMessage = errorMessage.split(': ').pop() || 'An error occurred';
      toast.error(cleanedMessage);
    } finally {
      setIsSubmitting(false);
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    {               /* //color picker  */}
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Colors</label>
                  <div className="flex flex-col gap-2">
                    {/* Color input form with preview */}
                    <div className="flex items-center gap-2">
                      {/* Preview of selected color */}
                      {colorInputs[colorInputs.length - 1].hex ? (
                        <div
                          className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg text-white"
                          style={{ backgroundColor: colorInputs[colorInputs.length - 1].hex }}
                        >
                          <span>{colorInputs[colorInputs.length - 1].name || 'Select a color'}</span>
                        </div>
                      ) : (
                        <div className="flex-1 px-4 py-3 rounded-lg border-[1.5px] border-gray-300 dark:border-[#dc651d] text-gray-500">
                          Select a color
                        </div>
                      )}
                      
                      <div className="relative">
                        <div
                          className="w-15 h-12 rounded-lg border-2 cursor-pointer"
                          style={{ backgroundColor: colorInputs[colorInputs.length - 1].hex || '#ffffff' }}
                          onClick={() => setShowColorPicker(showColorPicker === colorInputs.length - 1 ? null : colorInputs.length - 1)}
                        />
                        {showColorPicker === colorInputs.length - 1 && (
                          <div className="absolute right-0 bottom-14 z-50">
                            <div
                              className="fixed inset-0"
                              onClick={() => setShowColorPicker(null)}
                            />
                            <ChromePicker
                              color={colorInputs[colorInputs.length - 1].hex}
                              onChange={(newColor) => handleColorChange(colorInputs.length - 1, 'hex', newColor.hex)}
                            />
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleColorSubmit(colorInputs.length - 1)}
                        className="py-2 px-3 bg-[#dc651d] text-white rounded-lg hover:bg-opacity-90 transition duration-150 text-sm"
                        disabled={!colorInputs[colorInputs.length - 1].hex}
                      >
                        Add
                      </button>
                    </div>

                    {/* Divider when there are saved colors */}
                    {colorInputs.slice(0, -1).filter(color => color.name && color.hex).length > 0 && (
                      <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>
                    )}

                    {/* Display only saved color badges (excluding the current input) */}
                    <div className="flex flex-wrap gap-2">
                      {colorInputs.slice(0, -1).filter(color => color.name && color.hex).map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 rounded-full text-white"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span>{color.name}</span>
                          <button
                            type="button"
                            onClick={() => removeColorInput(index)}
                            className="p-1 hover:bg-black hover:bg-opacity-20 rounded-full transition duration-150"
                            aria-label="Remove color"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    value={productData.weight}
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
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-150"
                      aria-label="Remove color"
                    >
                      <FaTimes />
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