import React from 'react';

const ServiceCommingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#232a39' }}>
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Coming Soon!</h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8">
          We’re working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="relative inline-flex items-center">
          <div className="h-4 w-4 rounded-full bg-white animate-ping absolute"></div>
          <div className="h-4 w-4 rounded-full bg-white animate-ping absolute" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-4 w-4 rounded-full bg-white animate-ping absolute" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCommingSoon;
