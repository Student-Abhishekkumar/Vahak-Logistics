import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ExpertSupport = () => {
  return (
    <div className="px-4 py-20 bg-gradient-to-r from-teal-50 to-emerald-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Expert Support</h2>
            <p className="mt-4 text-lg text-gray-600">
              Dedicated customer support team to assist you throughout your logistics journey.
            </p>
            
            <div className="p-6 mt-8 bg-white rounded-xl">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Vahak</h3>
              <p className="text-gray-600">
                India's leading logistics platform connecting businesses with verified transporters for seamless goods movement.
              </p>
              
              <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-bold text-gray-900">Quick Links</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link to="/about" className="hover:text-teal-600">About Us</Link></li>
                    <li><Link to="/services" className="hover:text-teal-600">Services</Link></li>
                    <li><Link to="/pricing" className="hover:text-teal-600">Pricing</Link></li>
                    <li><Link to="/contact" className="hover:text-teal-600">Contact</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-3 font-bold text-gray-900">Services</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link to="/services/load-booking" className="hover:text-teal-600">Load Booking</Link></li>
                    <li><Link to="/services/vehicle-tracking" className="hover:text-teal-600">Vehicle Tracking</Link></li>
                    <li><Link to="/services/fleet-management" className="hover:text-teal-600">Fleet Management</Link></li>
                    <li><Link to="/services/analytics" className="hover:text-teal-600">Analytics</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-3 font-bold text-gray-900">Contact Info</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>+91 98765 43210</li>
                    <li>support@vahak.in</li>
                    <li>Sector 44, Gurgaon Haryana 122003, India</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-8 mt-8 text-center text-gray-600 border-t border-gray-200">
                <p>© 2024 Vahak. All rights reserved.</p>
                <div className="flex justify-center mt-2 space-x-4">
                  <Link to="/privacy" className="hover:text-teal-600">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-teal-600">Terms of Service</Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center w-full bg-gray-200 border-2 border-dashed h-96 rounded-xl">
              <span className="text-gray-500">Support Team Image</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSupport;