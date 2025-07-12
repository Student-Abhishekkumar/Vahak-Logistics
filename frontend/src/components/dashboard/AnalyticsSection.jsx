// src/components/dashboard/AnalyticsSection.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsSection = () => {
  // Sample analytics data
  const analyticsData = [
    { day: 'Mon', loads: 12, vehicles: 8 },
    { day: 'Tue', loads: 19, vehicles: 11 },
    { day: 'Wed', loads: 15, vehicles: 9 },
    { day: 'Thu', loads: 24, vehicles: 14 },
    { day: 'Fri', loads: 18, vehicles: 10 },
    { day: 'Sat', loads: 10, vehicles: 6 },
    { day: 'Sun', loads: 8, vehicles: 4 },
  ];

  const stats = [
    { title: 'Total Loads', value: '106', change: '+12%' },
    { title: 'Active Vehicles', value: '24', change: '+5%' },
    { title: 'On-time Delivery', value: '94%', change: '+3%' },
    { title: 'Revenue', value: '₹2,48,560', change: '+18%' },
  ];

  return (
    <div className="p-6 mt-6 bg-white shadow-md rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">{stat.title}</p>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="px-2 py-1 ml-2 text-sm rounded-full text-emerald-600 bg-emerald-100">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="loads" fill="#0d9488" radius={[4, 4, 0, 0]} />
            <Bar dataKey="vehicles" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          Weekly
        </button>
        <button className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-teal-600 to-emerald-700">
          Monthly
        </button>
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          Quarterly
        </button>
      </div>
    </div>
  );
};

export default AnalyticsSection;