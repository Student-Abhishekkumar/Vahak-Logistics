// src/pages/PricingPage.jsx
import React from 'react';
import Pricing from '../components/Pricing';
import ProfessionalFooter from '../components/ProfessionalFooter';

const PricingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Pricing />
      </main>
      <ProfessionalFooter />
    </div>
  );
};

export default PricingPage;