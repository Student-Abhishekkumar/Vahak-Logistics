import React from 'react';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import RealTimeTracking from '../components/RealTimeTracking';
import CompleteVisibility from '../components/CompleteVisibility';
import ExpertSupport from '../components/ExpertSupport';

const HomePage = ({ openAuthModal }) => {
  return (
    <div> {/* Reduced top padding */}
      <Hero openAuthModal={openAuthModal} />
      <WhyChoose />
      <RealTimeTracking />
      <CompleteVisibility />
      <ExpertSupport />
    </div>
  );
};

export default HomePage;