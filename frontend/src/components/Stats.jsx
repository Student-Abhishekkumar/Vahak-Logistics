import React from 'react';

const Stats = () => {
  const stats = [
    { value: '50,000+', label: 'Verified Transporters' },
    { value: '10 Lakh+', label: 'Successful Deliveries' },
    { value: '500+', label: 'Cities Connected' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="px-4 py-20 text-white bg-blue-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Trusted by Thousands</h1>
          <p className="max-w-2xl mx-auto text-xl">
            Join India's largest logistics network and experience the difference
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-20 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transition-all duration-300 hover:scale-105">
              <p className="mb-2 text-4xl font-bold">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="p-6 text-gray-800 bg-white shadow-xl rounded-xl">
          <h2 className="mb-6 text-2xl font-bold">Active Vehicles</h2>
          <p className="mb-6">Real-time status of vehicles currently on the road</p>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { id: 'VH001', plate: 'HR-55-A8-1234', status: 'In Transit' },
              { id: 'VH002', plate: 'UP-32-CD-5678', status: 'Loading' },
              { id: 'VH003', plate: 'MH-12-EF-9012', status: 'In Transit' },
              { id: 'VH004', plate: 'KA-05-GH-3456', status: 'Available' }
            ].map((vehicle, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-bold">{vehicle.id}</p>
                <p className="mb-3 text-gray-600">{vehicle.plate}</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                  vehicle.status === 'Loading' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;