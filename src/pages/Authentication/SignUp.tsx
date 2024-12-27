import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import BankDetails from "./BankDetails";
import PreviewForm from "./PreviewForm";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({
    personalDetails: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    },
    businessDetails: {
      businessName: "",
      businessType: "",
      businessPhone: "",
      businessEmail: "",
      gstNumber: "",
    },
    bankDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (step: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const validateFormData = () => {
    const { personalDetails, businessDetails, bankDetails } = formData;

    if (
      !personalDetails.fullName ||
      !personalDetails.email ||
      !personalDetails.password ||
      !personalDetails.phoneNumber ||
      !personalDetails.address ||
      !businessDetails.businessName ||
      !businessDetails.businessType ||
      !businessDetails.businessPhone ||
      !businessDetails.businessEmail ||
      !businessDetails.gstNumber ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName ||
      !bankDetails.ifscCode
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormData()) {
      setErrorMessage("All fields must be filled out.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/submit-form",
        formData
      );
      console.log("Form data submitted successfully:", response.data);
      localStorage.setItem("authToken", response.data.token);
      setErrorMessage(""); // Clear error message if submission is successful
      window.location.href = "/dashboard"; // Navigate to the home page after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting form. Please try again later.");
    }
  };

  const steps = [
    { id: 1, name: "Personal Details", component: PersonalDetails },
    { id: 2, name: "Business Details", component: BusinessDetails },
    { id: 3, name: "Bank Details", component: BankDetails },
    { id: 4, name: "Preview And Submit", component: PreviewForm },
  ];

  return (
    <div className="container px-4">
      <AuthHeader />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Stepper Navigation */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6 max-w-screen-lg w-full">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => setCurrentStep(step.id)} // Optional: Click to navigate
              className={`cursor-pointer text-center py-3 px-6 rounded transition-all duration-300 
              ${currentStep === step.id
                ? "bg-orange-700 font-semibold border-2 border-white text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }
              w-full
            `}
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>

      {/* Step Components */}
      <div className="flex flex-col items-center">
        {currentStep === 1 && (
          <PersonalDetails
            data={formData.personalDetails}
            onChange={(data) => handleChange("personalDetails", data)}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <BusinessDetails
            data={formData.businessDetails}
            onChange={(data) => handleChange("businessDetails", data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <BankDetails
            data={formData.bankDetails}
            onChange={(data) => handleChange("bankDetails", data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 4 && (
          <PreviewForm
            data={formData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
