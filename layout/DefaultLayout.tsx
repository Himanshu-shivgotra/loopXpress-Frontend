import React from 'react';

interface DefaultLayoutProps {
    children: React.ReactNode; // Define children prop
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            {/* Your layout structure */}
            {children} {/* Render children here */}
        </div>
    );
};

export default DefaultLayout; 