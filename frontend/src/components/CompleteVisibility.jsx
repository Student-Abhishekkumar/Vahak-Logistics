import React from 'react';
import { motion } from 'framer-motion';

const CompleteVisibility = () => {
  const features = [
    {
      title: "Complete Visibility",
      description: "Real-time location tracking with 99.9% accuracy for all your shipments",
      icon: "📍"
    },
    {
      title: "Performance Analytics",
      description: "Detailed reports on delivery times, fuel efficiency, and driver performance",
      icon: "📊"
    },
    {
      title: "Enhanced Security",
      description: "Instant alerts for route deviations and unauthorized stops",
      icon: "🔒"
    },
    {
      title: "Time Optimization",
      description: "Route optimization to reduce delivery time by up to 30%",
      icon: "⏱️"
    },
    {
      title: "Smart Notifications",
      description: "Automated updates on delivery status, delays, and arrival times",
      icon: "🔔"
    },
    {
      title: "Geofencing",
      description: "Custom zones with automatic entry/exit notifications",
      icon: "🗺️"
    }
  ];

  return (
    <div className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Complete Visibility</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Gain end-to-end visibility into your logistics operations with our advanced tracking and analytics platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-2xl bg-teal-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompleteVisibility;