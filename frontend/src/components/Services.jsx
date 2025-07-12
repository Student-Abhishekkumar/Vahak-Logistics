import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'Load Booking',
      description: 'Book loads instantly with verified transporters across India'
    },
    {
      title: 'Vehicle Tracking',
      description: 'Real-time GPS tracking for complete shipment visibility'
    },
    {
      title: 'Secure Payments',
      description: 'Safe and secure payment gateway with transaction protection'
    }
  ];

  return (
    <div className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-4 text-3xl font-bold text-center md:text-4xl">Our Services</h1>
        <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600">
          Comprehensive logistics solutions designed to streamline your transportation needs
        </p>
        
        <div className="pt-12 border-t-2 border-gray-200">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] rounded-xl p-6"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                  <span className="text-xl font-bold text-blue-700">{index + 1}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;