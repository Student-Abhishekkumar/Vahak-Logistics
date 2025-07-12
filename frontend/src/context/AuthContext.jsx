import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('vahak_user');
    const token = localStorage.getItem('vahak_token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);
  
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost/vahak/backend/user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email,
          password
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        const userData = {
          ...data.user,
          token: data.token,
          subscription: data.subscription
        };
        
        setUser(userData);
        localStorage.setItem('vahak_user', JSON.stringify(userData));
        localStorage.setItem('vahak_token', data.token);
        return userData;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost/vahak/backend/user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone || '',
          location: userData.location || '',
          company: userData.company || ''
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        const newUser = {
          ...data.user,
          token: data.token,
          subscription: data.subscription
        };
        
        setUser(newUser);
        localStorage.setItem('vahak_user', JSON.stringify(newUser));
        localStorage.setItem('vahak_token', data.token);
        return newUser;
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vahak_user');
    localStorage.removeItem('vahak_token');
  };

  // Add updateProfile function
  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('vahak_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost/vahak/backend/user.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'update_profile',
          name: profileData.name,
          phone: profileData.phone,
          location: profileData.location,
          company: profileData.company
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Update the user context and local storage
        const updatedUser = {
          ...user,
          ...data.user,
          token: user.token,
          subscription: user.subscription
        };

        setUser(updatedUser);
        localStorage.setItem('vahak_user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      } else {
        throw new Error(data.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: error.message };
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}