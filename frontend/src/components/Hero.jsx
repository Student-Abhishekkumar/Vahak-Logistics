import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Hero = ({ openAuthModal }) => {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-50 to-emerald-100">
      <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.h1 
              className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              India's Leading <span className="text-teal-600">Logistics Platform</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-gray-600 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Connect with verified transporters, track your shipments in real-time, and experience seamless logistics solutions.
            </motion.p>
          </div>
          
          <motion.div 
            className="p-6 bg-white shadow-xl rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Quick Load Booking</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">From</label>
                <input 
                  type="text" 
                  placeholder="Pickup Location"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">To</label>
                <input 
                  type="text" 
                  placeholder="Drop Location"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Weight</label>
                  <input 
                    type="number" 
                    placeholder="In Tons"
                    className="w-full p-4 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Vehicle</label>
                  <select className="w-full p-4 border border-gray-300 rounded-lg">
                    <option>Select Type</option>
                    <option>Open Truck</option>
                    <option>Container</option>
                    <option>Trailer</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 font-bold text-white transition-colors rounded-lg bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800"
              >
                Search Vehicles
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;