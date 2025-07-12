import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RealTimeTracking = () => {
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Tracking enabled successfully!');
    setToken('');
  };

  return (
    <div className="px-4 py-20 bg-gradient-to-r from-teal-50 to-emerald-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Real-Time Vehicle Tracking
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Enter your Mapbox public token to enable real-time GPS tracking for all your shipments with 99.9% accuracy.
            </p>
            
            <div className="p-6 mt-8 text-left bg-white rounded-xl">
              <h3 className="font-bold text-gray-900">Advanced Tracking Benefits</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Route optimization to reduce delivery time by up to 30%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Instant alerts for route deviations and unauthorized stops</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated updates on delivery status and arrival times</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-8 bg-white shadow-xl rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Enter Mapbox Token</label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="pkey.xxxxxxxxxxxxxxxx"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-4 font-bold text-white transition-colors rounded-lg bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800"
              >
                Enable Tracking
              </button>
              
              <div className="text-center">
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800"
                >
                  Get your free token at mapbox.com
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracking;