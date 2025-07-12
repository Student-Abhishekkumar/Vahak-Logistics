import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Progress } from './ui/progress';

const DashboardSidebar = ({ activeSection, setActiveSection }) => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'vehicles', label: 'Vehicle Management', icon: '🚚' },
    { id: 'loads', label: 'Load Management', icon: '📦' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'upgrade', label: 'Upgrade Plan', icon: '🚀' }
  ];
  
  const planLimits = [
    { label: 'Vehicles', used: subscription?.usedVehicles || 0, total: subscription?.vehicles || 0 },
    { label: 'Loads', used: subscription?.usedLoads || 0, total: subscription?.loads || 0 }
  ];

  return (
    <div className="hidden w-full lg:block lg:w-64">
      <div className="p-6 mb-6 bg-white shadow-md rounded-xl">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full bg-gradient-to-r from-teal-500 to-emerald-600">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="ml-4">
            <h3 className="font-bold">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <div className="inline-block px-2 py-1 mt-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
              {subscription?.plan?.charAt(0).toUpperCase() + subscription?.plan?.slice(1)} Plan
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {planLimits.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.used}/{item.total}</span>
              </div>
              <Progress 
                value={(item.used / (item.total || 1)) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="overflow-hidden bg-white shadow-md rounded-xl">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "secondary" : "ghost"}
            className={`w-full text-left justify-start px-4 py-3 ${
              activeSection === item.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;