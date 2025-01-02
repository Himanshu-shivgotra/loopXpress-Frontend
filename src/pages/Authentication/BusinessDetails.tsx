import React, { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance";

const BusinessDetails: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}> = ({ data, onChange, onNext, onPrevious }) => {
  const [formErrors, setFormErrors] = useState<any>({});
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [gstDetails, setGstDetails] = useState<any>(data.gstDetails || null);

  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    onChange({ ...data, [name]: value });

    if (name === 'gstNumber') {
      if (gstRegex.test(value)) {
        const originalGstNumber = value;

        const isGstExists = await checkGstInDatabase(value);

        if (isGstExists) {
          setFormErrors({
            ...formErrors,
            gstNumber: "This GST number is already registered with another account."
          });
          setGstDetails(null);
          return;
        }

        await verifyGstNumber(value);

        onChange({
          ...data,
          [name]: originalGstNumber,
          businessName: data.businessName,
          businessType: data.businessType,
          address: data.address
        });
      } else {
        setGstDetails(null);
      }
    }
  };

  const checkGstInDatabase = async (gstNumber: string) => {
    try {
      const response = await axiosInstance.post("/api/gst/check-exists", {
        gstin: gstNumber,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      return result.exists;

    } catch (error) {
      console.error("Error checking GST in database:", error);
      setFormErrors({
        ...formErrors,
        gstNumber: "Error checking GST number availability."
      });
      return false;
    }
  };


  const verifyGstNumber = async (gstNumber: string) => {
    setIsVerifying(true);
    try {
      console.log('Frontend: Sending GST verification request for:', gstNumber);

      const response = await axiosInstance.post("/api/gst/verify-gst", {
        gstin: gstNumber,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers["content-type"];
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = response.data;
      } else {
        throw new Error("Received non-JSON response");
      }

      console.log("Frontend: Received API Response:", result);

      if (!result.success || !result.data) {
        setFormErrors({
          ...formErrors,
          gstNumber: result.message || "GST verification failed."
        });
        setGstDetails(null);
        return false;
      }

      console.log("Frontend: Setting GST Details:", result.data);
      setGstDetails(result.data);

      onChange({
        ...data,
        businessName: result.data.legalName,
        businessType: result.data.businessType,
        address: result.data.address,
        gstDetails: result.data,
      });

      setFormErrors({ ...formErrors, gstNumber: "" });
      return true;

    } catch (error) {
      console.error("Frontend: GST Verification Error:", error);
      setFormErrors({
        ...formErrors,
        gstNumber: "Network error, please try again later.",
      });
      setGstDetails(null);
      return false;
    } finally {
      setIsVerifying(false);
    }
  };


  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!data.businessName || data.businessName.trim() === "") {
      errors.businessName = "Business Name is required.";
      isValid = false;
    }

    if (!data.businessType || data.businessType === "") {
      errors.businessType = "Please select a valid business type.";
      isValid = false;
    }

    if (!data.businessPhone || !/^\d{10}$/.test(data.businessPhone)) {
      errors.businessPhone = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (!data.businessEmail || !/\S+@\S+\.\S+/.test(data.businessEmail)) {
      errors.businessEmail = "Please enter a valid email address.";
      isValid = false;
    }

    if (!data.gstNumber || !gstRegex.test(data.gstNumber)) {
      errors.gstNumber = "Please enter a valid GST Number.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = async () => {
    if (!validateForm()) return;
    onNext();
  };

  useEffect(() => {
    console.log("Frontend: Current gstDetails state:", gstDetails);
  }, [gstDetails]);

  useEffect(() => {
    if (data.gstDetails) {
      setGstDetails(data.gstDetails);
    }
  }, [data.gstDetails]);

  return (
    <div className="flex items-center justify-center w-full p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-lg shadow-md bg-white dark:bg-boxdark dark:border-strokedark">
        <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
          <div className="w-full p-4 sm:p-8 xl:p-10">
            <h2 className="mb-6 text-xl sm:text-2xl font-bold text-orange-500 dark:text-white text-left">
              Sign Up to Loop
            </h2>

            <form>
              <span className="mb-1.5 block font-medium text-left">
                Seller Business Details
              </span>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="col-span-1">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="businessName"
                      value={data.businessName || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your Business name"
                      className="w-full rounded-lg border bg-transparent py-2 px-4"
                    />
                    {formErrors.businessName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Type
                  </label>
                  <div className="relative">
                    <select
                      name="businessType"
                      value={data.businessType || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-transparent py-2 px-4"
                    >
                      <option value="" disabled>
                        Select Business Type
                      </option>
                      <option value="Retailer">Retailer</option>
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.businessType && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessType}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="col-span-1">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="businessPhone"
                      value={data.businessPhone || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your Business Phone"
                      className="w-full rounded-lg border bg-transparent py-2 px-4"
                    />
                    {formErrors.businessPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="businessEmail"
                      value={data.businessEmail || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your Business Email"
                      className="w-full rounded-lg border bg-transparent py-2 px-4"
                    />
                    {formErrors.businessEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  GST Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="gstNumber"
                    value={data.gstNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Enter GST Number"
                    className="w-full rounded-lg border bg-transparent py-2 px-4"
                  />
                  {isVerifying && (
                    <p className="text-blue-500 text-sm mt-1">Verifying GST...</p>
                  )}
                  {formErrors.gstNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.gstNumber}
                    </p>
                  )}
                </div>
              </div>

              {gstDetails ? (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-3">GST Details</h3>
                  <div className="grid gap-2">
                    <p><strong>Legal Name: </strong>{gstDetails.legalName || 'N/A'}</p>
                    <p><strong>Trade Name: </strong>{gstDetails.tradeName || 'N/A'}</p>
                    <p><strong>Business Type: </strong>{gstDetails.businessType || 'N/A'}</p>
                    <p><strong>GST Status: </strong>
                      <span className={gstDetails.gstStatus === 'Active' ? 'text-green-500' : 'text-red-500'}>
                        {gstDetails.gstStatus || 'N/A'}
                      </span>
                    </p>
                    <p><strong>Registration Date: </strong>{gstDetails.registrationDate || 'N/A'}</p>
                    <p><strong>Last Updated: </strong>{gstDetails.lastUpdateDate || 'N/A'}</p>
                    <p><strong>Nature of Business: </strong>{gstDetails.natureOfBusiness || 'N/A'}</p>
                    <p><strong>Address: </strong>{gstDetails.address || 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  {isVerifying ? (
                    <p className="text-blue-500">Verifying GST details...</p>
                  ) : (
                    gstDetails === null && <p className="text-gray-500">No GST details available</p>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="w-24 rounded-lg border bg-gray p-4 text-dark hover:bg-opacity-90"
                  onClick={onPrevious}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-24 rounded-lg border bg-primary p-4 text-white hover:bg-opacity-90"
                  onClick={handleNext}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
