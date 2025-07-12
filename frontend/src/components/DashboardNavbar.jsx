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
    // Get section from URL query params if exists
    const sectionParam = searchParams.get('section');
    if (sectionParam && ['profile', 'vehicles', 'loads', 'upgrade', 'analytics'].includes(sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const sections = {
    profile: <ProfileSection />,
    vehicles: <VehicleManagement />,
    loads: <LoadManagement />,
    upgrade: <PlanUpgrade />,
    analytics: <AnalyticsSection />
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <ProfessionalNavbar />
      </div>
      
      <div className="pt-16">
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