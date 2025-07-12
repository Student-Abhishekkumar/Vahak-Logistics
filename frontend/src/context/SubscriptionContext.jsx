import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const [subscription, setSubscription] = useState(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user && user.subscription) {
      setSubscription(user.subscription);
    }
  }, [user]);
  
  const refreshSubscription = async () => {
    if (!user) return;
    
    try {
      const response = await fetch('http://localhost/vahak/backend/subscription.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user.id
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setSubscription(data.subscription);
        const updatedUser = {
          ...user,
          subscription: data.subscription
        };
        localStorage.setItem('vahak_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to refresh subscription:', error);
    }
  };
  
  const upgradePlan = async (newPlan) => {
    try {
      const response = await fetch('http://localhost/vahak/backend/subscription.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user.id,
          plan: newPlan
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setSubscription(data.subscription);
        const updatedUser = {
          ...user,
          subscription: data.subscription
        };
        localStorage.setItem('vahak_user', JSON.stringify(updatedUser));
        return data.subscription;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <SubscriptionContext.Provider value={{ subscription, upgradePlan, refreshSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}