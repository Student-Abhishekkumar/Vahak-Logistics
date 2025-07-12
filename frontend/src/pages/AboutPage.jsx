import React from 'react';

const AboutPage = () => {
  return (
    <div className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl">About Vahak Logistics</h1>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
            <p className="mb-4 text-gray-600">
              Founded in 2020, Vahak Logistics started with a simple mission: to revolutionize India's logistics industry by connecting businesses with verified transporters through a seamless digital platform.
            </p>
            <p className="text-gray-600">
              Today, we're proud to be India's fastest-growing logistics platform with over 50,000 verified transporters and serving thousands of businesses across the country.
            </p>
          </div>
          
          <div className="w-full h-64 bg-gray-200 border-2 border-dashed rounded-xl" />
        </div>
        
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-center">Our Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 border-2 border-dashed rounded-xl" />
                <h3 className="text-lg font-bold">Team Member {item}</h3>
                <p className="text-gray-600">Co-Founder & CEO</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;