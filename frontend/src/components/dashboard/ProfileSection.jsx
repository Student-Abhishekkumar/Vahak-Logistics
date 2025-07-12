import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import ProfileSettings from './ProfileSettings';
import { useSubscription } from '../../context/SubscriptionContext';

const ProfileSection = () => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user || !subscription) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-100">
        <div className="w-12 h-12 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">Your Profile</CardTitle>
          <Button 
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <ProfileSettings setIsEditing={setIsEditing} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <motion.div 
                className="flex items-center p-4 bg-white rounded-lg shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full bg-gradient-to-r from-teal-500 to-emerald-600">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">{user?.name || 'User Name'}</h3>
                  <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                  <div className="mt-1">
                    <span className="px-2 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full">
                      {subscription.plan} Plan
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 space-y-4 bg-white rounded-lg shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-800">{user?.phone || '+91 98765 43210'}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-800">{user?.location || 'Gurgaon, India'}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-800">{user?.company || 'Vahak Logistics'}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="p-4 space-y-6 border-l-0 md:border-l md:border-gray-200 md:pl-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-800">Subscription Plan</h3>
              <div className="p-4 border border-teal-100 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-700">
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">Active</span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicles:</span>
                    <span className="font-medium text-gray-800">
                      {subscription.usedVehicles || 0} / {subscription.vehicles === 'Unlimited' ? '∞' : subscription.vehicles || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loads:</span>
                    <span className="font-medium text-gray-800">
                      {subscription.usedLoads || 0} / {subscription.loads === 'Unlimited' ? '∞' : subscription.loads || 0}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 mt-4 bg-white rounded-lg shadow">
                <h4 className="mb-3 font-bold text-gray-800">Account Security</h4>
                <Button variant="outline" className="w-full border-gray-300">
                  Change Password
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSection;