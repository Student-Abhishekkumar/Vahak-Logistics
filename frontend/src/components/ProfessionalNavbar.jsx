import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';

const ProfessionalNavbar = ({ openAuthModal }) => {
  const { user, logout } = useAuth();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const profileRef = useRef(null);

  const menuItems = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const servicesItems = [
    { name: 'Load Booking', icon: '🚚', path: '/services/load-booking' },
    { name: 'Vehicle Tracking', icon: '📍', path: '/services/vehicle-tracking' },
    { name: 'Fleet Management', icon: '📊', path: '/services/fleet-management' },
    { name: 'Analytics Dashboard', icon: '📈', path: '/services/analytics' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isServicesOpen && servicesRef.current && !servicesRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
      if (isProfileDropdownOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesOpen, isProfileDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsSheetOpen(false);
  };

  const handleAuthClick = (type) => {
    openAuthModal(type);
    setIsSheetOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsSheetOpen(false);
    setIsServicesOpen(false);
    setIsProfileDropdownOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background shadow-md py-2' : 'bg-background py-4'
      }`}
      style={{ height: '64px' }}
    >
      <div className="h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => {
                setIsSheetOpen(false);
                setIsServicesOpen(false);
                setIsProfileDropdownOpen(false);
              }}
            >
              <motion.div 
                className="px-3 py-2 mr-2 text-xl font-bold text-white rounded-lg bg-gradient-to-r from-teal-600 to-emerald-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vahak
              </motion.div>
              <span className="hidden text-xl font-bold text-foreground md:block">Logistics</span>
            </Link>
          </div>
          
          <div className="items-center hidden space-x-4 lg:flex">
            <div className="relative services-dropdown" ref={servicesRef}>
              <motion.div 
                className="flex items-center px-3 py-2 text-base font-medium transition-colors duration-300 cursor-pointer text-foreground hover:text-primary"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Services
                <motion.svg 
                  className={`w-4 h-4 ml-1 transition-transform ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.div>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    className="absolute z-10 w-64 mt-1 bg-white rounded-md shadow-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {servicesItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNavigation(item.path)}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        transition={{ duration: 0.1 }}
                      >
                        <span className="mr-3 text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="mt-1 text-sm text-gray-500">Efficient and reliable service</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.path}
                  className="px-3 py-2 text-base font-medium transition-colors duration-300 text-foreground hover:text-primary"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="items-center hidden space-x-2 lg:flex">
            {user ? (
              <div className="relative" ref={profileRef}>
                <motion.div 
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-full bg-gradient-to-r from-teal-500 to-emerald-600">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-base font-medium text-foreground">
                    {user.name}
                  </span>
                </motion.div>
                
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div 
                      className="absolute right-0 z-10 w-48 mt-1 bg-white rounded-md shadow-xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNavigation('/dashboard')}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        transition={{ duration: 0.1 }}
                      >
                        My Dashboard
                      </motion.div>
                      <motion.div 
                        className="p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNavigation('/profile')}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        transition={{ duration: 0.1 }}
                      >
                        My Profile
                      </motion.div>
                      <motion.div 
                        className="p-3 cursor-pointer hover:bg-gray-50"
                        onClick={handleLogout}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        transition={{ duration: 0.1 }}
                      >
                        Logout
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="ghost"
                    className="px-4 py-2 text-base"
                    onClick={() => openAuthModal('login')}
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="px-4 py-2 text-base bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800"
                    onClick={() => openAuthModal('register')}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </>
            )}
          </div>
          
          <div className="flex items-center lg:hidden">
            {/* Fixed Sheet implementation to prevent onOpenChange warning */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="w-4/5 bg-white">
                <motion.div 
                  className="flex flex-col h-full pb-20 overflow-y-auto"
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="absolute p-2 text-gray-500 rounded-full top-4 right-4 hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="p-4 border-b">
                    {user ? (
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 mr-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-teal-500 to-emerald-600">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="inline-block px-2 py-1 mt-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                            {user.subscription?.plan || 'Free'} Plan
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mb-3 text-gray-600">Sign in to access all features</p>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button 
                              variant="outline"
                              className="text-gray-800"
                              onClick={() => handleAuthClick('login')}
                            >
                              Login
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button 
                              className="text-white bg-gradient-to-r from-teal-600 to-emerald-700"
                              onClick={() => handleAuthClick('register')}
                            >
                              Register
                            </Button>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <motion.div 
                      className="flex items-center justify-between w-full px-3 py-4 text-lg text-gray-800 cursor-pointer"
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      transition={{ duration: 0.1 }}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">📦</span>
                        Services
                      </span>
                      <motion.svg 
                        className={`w-5 h-5 transform transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.div>
                    
                    <AnimatePresence>
                      {isMobileServicesOpen && (
                        <motion.div 
                          className="py-2 pl-4 space-y-3"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {servicesItems.map((item, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center w-full p-3 text-gray-800 cursor-pointer hover:bg-gray-100"
                              onClick={() => handleNavigation(item.path)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <span className="mr-3 text-xl">{item.icon}</span>
                              <span className="font-medium">{item.name}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center w-full px-3 py-4 text-lg text-gray-800 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleNavigation(item.path)}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        transition={{ duration: 0.1 }}
                      >
                        <span className="mr-2">📍</span>
                        {item.name}
                      </motion.div>
                    ))}
                    
                    {user && (
                      <>
                        <motion.div
                          className="flex items-center w-full px-3 py-4 text-lg text-gray-800 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleNavigation('/dashboard')}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          transition={{ duration: 0.1 }}
                        >
                          <span className="mr-2">📊</span>
                          Dashboard
                        </motion.div>
                        <motion.div
                          className="flex items-center w-full px-3 py-4 text-lg text-gray-800 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleNavigation('/profile')}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          transition={{ duration: 0.1 }}
                        >
                          <span className="mr-2">👤</span>
                          My Profile
                        </motion.div>
                        <motion.div
                          className="flex items-center w-full px-3 py-4 text-lg text-gray-800 cursor-pointer hover:bg-gray-100"
                          onClick={handleLogout}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          transition={{ duration: 0.1 }}
                        >
                          <span className="mr-2">🚪</span>
                          Logout
                        </motion.div>

                        <div className="p-4 mt-6 rounded-lg bg-gray-50">
                          <h3 className="mb-3 text-lg font-semibold text-gray-800">Subscription Plan</h3>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Vehicles:</span>
                            <span className="font-medium">
                              {user.subscription?.used_vehicles || 0} / {user.subscription?.vehicles || 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loads:</span>
                            <span className="font-medium">
                              {user.subscription?.used_loads || 0} / {user.subscription?.loads || 0}
                            </span>
                          </div>
                          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-teal-500 rounded-full" 
                              style={{ 
                                width: `${Math.max(
                                  (user.subscription?.used_vehicles || 0) / (user.subscription?.vehicles || 1) * 100,
                                  (user.subscription?.used_loads || 0) / (user.subscription?.loads || 1) * 100
                                )}%` 
                              }}
                            ></div>
                          </div>
                          <Button 
                            className="w-full mt-4 bg-gradient-to-r from-teal-600 to-emerald-700"
                            onClick={() => handleNavigation('/dashboard?section=upgrade')}
                          >
                            Upgrade Plan
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="px-4 py-8 mt-auto border-t">
                    <h4 className="flex items-center mb-3 font-bold text-gray-800">
                      <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contact Us
                    </h4>
                    <div className="pl-2 space-y-3 text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2 font-medium text-emerald-600">Phone:</span>
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 font-medium text-emerald-600">Email:</span>
                        <span>support@vahak.in</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 font-medium text-emerald-600">Address:</span>
                        <span>Sector 44, Gurgaon Haryana 122003, India</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfessionalNavbar;