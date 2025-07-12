import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import ProfessionalNavbar from '../components/ProfessionalNavbar';
import ProfileSection from '../components/dashboard/ProfileSection';
import VehicleManagement from '../components/dashboard/VehicleManagement';
import LoadManagement from '../components/dashboard/LoadManagement';
import PlanUpgrade from '../components/dashboard/PlanUpgrade';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      // Get section from URL query params if exists
      const sectionParam = searchParams.get('section');
      if (sectionParam && ['profile', 'vehicles', 'loads', 'upgrade', 'analytics'].includes(sectionParam)) {
        setActiveSection(sectionParam);
      } else {
        setActiveSection('profile');
      }
      setIsLoading(false);
    }
  }, [user, searchParams]);

  const sections = {
    profile: <ProfileSection />,
    vehicles: <VehicleManagement />,
    loads: <LoadManagement />,
    upgrade: <PlanUpgrade />,
    analytics: <AnalyticsSection />
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="flex flex-col items-center max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-center w-24 h-24 mb-6 text-4xl font-bold text-white rounded-full bg-gradient-to-r from-teal-500 to-emerald-600">
            {user?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name ? `Welcome, ${user.name}!` : 'Welcome to Your Dashboard'}
            </h2>
            <p className="mt-1 text-gray-600">{user?.email || 'user@example.com'}</p>
            
            {user?.companyName && (
              <div className="inline-flex items-center px-4 py-2 mt-3 rounded-full bg-teal-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-teal-700">{user.companyName}</span>
              </div>
            )}
          </div>
          
          <div className="w-full mb-6">
            <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
              <div className="h-full bg-teal-500 rounded-full animate-pulse" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 -ml-1 text-teal-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">
              {user?.name 
                ? `Setting up ${user.name.split(' ')[0]}'s dashboard...` 
                : 'Preparing your personalized workspace...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <ProfessionalNavbar />
      </div>
      
      <div>
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <DashboardSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
            
            <div className="flex-1">
              <div className="p-4 mb-4 bg-white shadow rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 capitalize">
                  {activeSection === 'upgrade' ? 'Subscription Plans' : activeSection}
                </h2>
                <p className="text-gray-600">
                  {activeSection === 'profile' && 'Manage your personal information'}
                  {activeSection === 'vehicles' && 'Track and manage your fleet'}
                  {activeSection === 'loads' && 'Find and manage available loads'}
                  {activeSection === 'upgrade' && 'Choose the best plan for your business'}
                  {activeSection === 'analytics' && 'Performance insights and metrics'}
                </p>
              </div>
              
              <div className="p-6 bg-white shadow-md rounded-xl">
                {sections[activeSection]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;