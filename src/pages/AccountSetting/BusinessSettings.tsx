import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

const BusinessSettings = () => {
  const { userInfo, loading, error, updateBusinessInfo } = useUserInfo();

  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessType: "",
    gstNumber: "",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo?.businessDetails) {
      setFormData({
        businessName: userInfo.businessDetails.businessName || "",
        businessEmail: userInfo.businessDetails.businessEmail || "",
        businessPhone: userInfo.businessDetails.businessPhone || "",
        businessType: userInfo.businessDetails.businessType || "",
        gstNumber: userInfo.businessDetails.gstNumber || "",
      });
    }
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null); // Reset previous error
    try {
      await updateBusinessInfo({ businessDetails: formData });
      toast.success("Business details updated successfully!");
    } catch (err: any) {
      console.error("Error updating business info:", err);
      setSubmitError(err.message || "Failed to save changes. Please try again.");
      toast.error(err.message || "Failed to save changes. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <ToastContainer/>
    <div className="mx-auto max-w-4xl">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Business Settings</h3>
        </div>
        <div className="p-7">
          <form onSubmit={handleSaveChanges}>
            <div className="mb-5.5">
              <label
                htmlFor="businessName"
                className="mb-3 block text-sm font-medium text-gray-500 dark:text-white"
              >
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke  py-3 px-4.5 text-gray-500 focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your business name"
              />
            </div>

            <div className="mb-5.5">
              <label
                htmlFor="businessEmail"
                className="mb-3 block text-sm font-medium text-gray-500 dark:text-white"
              >
                Business Email
              </label>
              <input
                id="businessEmail"
                name="businessEmail"
                type="email"
                value={formData.businessEmail}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke  py-3 px-4.5 text-gray-500 focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your business email"
              />
            </div>

            <div className="mb-5.5">
              <label
                htmlFor="businessPhone"
                className="mb-3 block text-sm font-medium text-gray-500 dark:text-white"
              >
                Business Phone
              </label>
              <input
                id="businessPhone"
                name="businessPhone"
                type="text"
                value={formData.businessPhone}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke  py-3 px-4.5 text-gray-500 focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your business phone"
              />
            </div>

            <div className="mb-5.5">
              <label
                htmlFor="gstNumber"
                className="mb-3 block text-sm font-medium text-gray-500 dark:text-white"
              >
                GST Number
              </label>
              <input
                id="gstNumber"
                name="gstNumber"
                type="text"
                value="GST123456789"
                readOnly
                className="w-full rounded border border-stroke  py-3 px-4.5 text-gray-500 focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your GST number"
              />
              <p className="text-sm text-gray-500 mt-2">GST Number cannot be changed.</p>
            </div>

            <div className="mb-5.5">
              <label
                htmlFor="businessType"
                className="mb-3 block text-sm font-medium text-gray-500 dark:text-white"
              >
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke  py-3 px-4.5 text-gray-500 focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
              >
                <option value="" disabled>
                  Select your business type
                </option>
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Service Provider">Service Provider</option>
              </select>
            </div>

            <div className="flex justify-end gap-6">
              <button
                type="submit"
                className="inline-flex items-center rounded bg-orange-500 px-8 py-3 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default BusinessSettings;
