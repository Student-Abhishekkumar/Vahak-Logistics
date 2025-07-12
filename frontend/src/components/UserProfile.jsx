import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import ProfessionalNavbar from './ProfessionalNavbar';
import ProfessionalFooter from './ProfessionalFooter';

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Mock bookings data
  const bookings = [
    { id: 'BK001', from: 'Delhi', to: 'Mumbai', weight: '20 Tons', vehicle: 'Truck', status: 'In Transit', date: '10 Jul, 2025' },
    { id: 'BK002', from: 'Bangalore', to: 'Chennai', weight: '15 Tons', vehicle: 'Container', status: 'Delivered', date: '8 Jul, 2025' },
    { id: 'BK003', from: 'Kolkata', to: 'Delhi', weight: '25 Tons', vehicle: 'Trailer', status: 'Pending', date: '5 Jul, 2025' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen px-4 pt-20 pb-12 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* <ProfessionalNavbar /> */}
      <main className="flex-grow px-4 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden bg-white shadow-md rounded-xl">
            {/* Profile Header */}
            <div className="p-8 text-white bg-gradient-to-r from-blue-700 to-blue-900">
              <div className="flex flex-col items-center md:flex-row">
                <div className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl" />
                <div className="mt-6 text-center md:ml-8 md:mt-0 md:text-left">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="mt-1 text-blue-200">{user.email}</p>
                  <p className="mt-3">Customer since July 2025</p>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {['bookings', 'profile', 'settings'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-4 font-medium ${
                      activeTab === tab
                        ? 'text-blue-700 border-b-2 border-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'bookings' && 'My Bookings'}
                    {tab === 'profile' && 'Profile Settings'}
                    {tab === 'settings' && 'Account Settings'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Recent Bookings</h2>
                    <button className="px-4 py-2 font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                      + New Booking
                    </button>
                  </div>
                  
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <h3 className="mb-4 text-lg font-semibold">Quick Load Booking</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-gray-700">From</label>
                        <input 
                          type="text" 
                          placeholder="Pickup Location" 
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700">To</label>
                        <input 
                          type="text" 
                          placeholder="Drop Location" 
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700">Weight (in Tons)</label>
                        <input 
                          type="number" 
                          placeholder="Enter weight" 
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700">Vehicle Type</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                          <option value="">Select Type</option>
                          <option value="truck">Truck</option>
                          <option value="container">Container</option>
                          <option value="trailer">Trailer</option>
                          <option value="mini-truck">Mini Truck</option>
                        </select>
                      </div>
                    </div>
                    <button className="w-full px-8 py-3 mt-6 font-bold text-white transition duration-300 bg-blue-700 rounded-lg md:w-auto hover:bg-blue-800">
                      Search Vehicles
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Booking ID</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Route</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Details</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium whitespace-nowrap">{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {booking.from} → {booking.to}
                            </td>
                            <td className="px-6 py-4">
                              <div>{booking.weight}</div>
                              <div className="text-sm text-gray-500">{booking.vehicle}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                booking.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                                booking.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{booking.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="text-blue-600 hover:text-blue-900">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div>
                  <h2 className="mb-6 text-xl font-bold">Profile Settings</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user.name} 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user.email} 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter phone number" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700">Company</label>
                      <input 
                        type="text" 
                        placeholder="Enter company name" 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-gray-700">Address</label>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg" 
                        rows="3" 
                        placeholder="Enter your address"
                      ></textarea>
                    </div>
                  </div>
                  <button className="px-6 py-2 mt-6 font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                    Update Profile
                  </button>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="mb-6 text-xl font-bold">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h3 className="mb-3 text-lg font-semibold">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block mb-2 text-gray-700">Current Password</label>
                          <input type="password" className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                          <label className="block mb-2 text-gray-700">New Password</label>
                          <input type="password" className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                          <label className="block mb-2 text-gray-700">Confirm New Password</label>
                          <input type="password" className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <button className="px-6 py-2 font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                          Change Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h3 className="mb-3 text-lg font-semibold">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" id="email-notif" className="mr-3" defaultChecked />
                          <label htmlFor="email-notif">Email notifications</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="sms-notif" className="mr-3" />
                          <label htmlFor="sms-notif">SMS notifications</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="app-notif" className="mr-3" defaultChecked />
                          <label htmlFor="app-notif">App notifications</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                      <h3 className="mb-3 text-lg font-semibold text-red-700">Danger Zone</h3>
                      <p className="mb-4">Deleting your account will remove all your data permanently.</p>
                      <button className="px-6 py-2 font-medium text-red-500 border border-red-500 rounded-lg hover:bg-red-50">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ProfessionalFooter />
    </div>
  );
};

export default UserProfile;