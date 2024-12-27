import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PersonalSettings from './AccountSetting/PersonalSettings';
import BusinessSettings from './AccountSetting/BusinessSettings';


const Settings: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    { label: "Personal Details", content: <PersonalSettings /> },
    { label: "Business Details", content: <BusinessSettings /> },

  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="settings-container mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />

      {/* Stepper Navigation */}
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => setCurrentStep(index)} // Optional: Click to navigate
            className={`cursor-pointer text-center py-2 px-4 mx-2 rounded ${currentStep === index
              ? "bg-orange-500 font-semibold border-2 border-white text-white"
              : "bg-gray-200 text-gray-600"
              }`}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="step-content">
        {steps[currentStep].content}
      </div>
    </div>
  );
};

export default Settings;
