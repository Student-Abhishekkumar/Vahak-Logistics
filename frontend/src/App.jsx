import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useLocation
} from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserProfile from './components/UserProfile';
import AuthModal from './components/AuthModal';
import ProfessionalNavbar from './components/ProfessionalNavbar';
import ProfessionalFooter from './components/ProfessionalFooter';

function LocationWrapper({ children }) {
  const location = useLocation();
  return children(location);
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');
  
  const openAuthModal = (type) => {
    setAuthModalType(type);
    setIsAuthModalOpen(true);
  };
  
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const switchToRegister = () => setAuthModalType('register');
  const switchToLogin = () => setAuthModalType('login');

  return (
    <ThemeProvider defaultTheme="light" storageKey="vahak-theme">
      <AuthProvider>
        <SubscriptionProvider>
          <Router>
            <LocationWrapper>
              {(location) => (
                <>
                  {/* Only show navbar on non-dashboard pages */}
                  {!location.pathname.startsWith('/dashboard') && (
                    <ProfessionalNavbar openAuthModal={openAuthModal} />
                  )}
                  
                  <div className="min-h-screen pt-16">
                    <Routes>
                      <Route path="/" element={<HomePage openAuthModal={openAuthModal} />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <DashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <UserProfile />
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                  
                  {/* Only show footer on non-dashboard pages */}
                  {!location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/profile') && (
                    <ProfessionalFooter />
                  )}

                  {/* Auth Modal */}
                  {isAuthModalOpen && (
                    <AuthModal 
                      type={authModalType}
                      onClose={closeAuthModal}
                      switchToRegister={switchToRegister}
                      switchToLogin={switchToLogin}
                    />
                  )}
                </>
              )}
            </LocationWrapper>
          </Router>
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Allow access to homepage even when logged in
  if (!user && location.pathname !== '/') {
    return <Navigate to="/" state={{ from: location }} replace />;  
  }
  
  return children;
}

export default App;