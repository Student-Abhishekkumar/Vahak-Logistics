import React, { useState, useEffect } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { useAuth } from '../../context/AuthContext';

const LoadManagement = () => {
  const { user } = useAuth();
  const { subscription, refreshSubscription } = useSubscription();
  const [loads, setLoads] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize subscription data properly
  const usedLoads = subscription?.usedLoads || 0;
  const maxLoads = subscription?.loads || 0;
  
  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const response = await fetch('http://localhost/vahak/backend/load.php', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({
            action: 'list',
            userId: user.id
          })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setLoads(data.loads);
        } else {
          setError('Failed to fetch loads');
        }
      } catch (error) {
        console.error('Failed to fetch loads:', error);
        setError('Network error. Please try again.');
      }
    };
    
    if (user && user.token) {
      fetchLoads();
    }
  }, [user]);

  const handleAddLoad = async () => {
    if (usedLoads >= maxLoads) {
      alert('Load limit reached! Please upgrade your plan.');
      return;
    }
    
    setIsAdding(true);
    setError('');
    
    const newLoad = {
      id: `LD${(loads.length + 1).toString().padStart(3, '0')}`,
      name: 'New Load',
      status: 'Open',
      route: 'New Route',
      weight: '10 Tons',
      material: 'General Goods',
      price: '10000',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      bids_count: 0
    };
    
    try {
      const response = await fetch('http://localhost/vahak/backend/load.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          action: 'add',
          userId: user.id,
          load: newLoad
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setLoads([...loads, { ...newLoad, id: data.loadId }]);
        refreshSubscription();
      } else {
        setError(data.message || 'Failed to add load');
      }
    } catch (error) {
      console.error('Failed to add load:', error);
      setError('Failed to add load. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Load Management</h1>
          <p className="mt-2 text-gray-600">Post and manage your loads with competitive bidding</p>
        </div>
        <button 
          onClick={handleAddLoad}
          disabled={isAdding}
          className={`px-4 py-2 font-medium text-white rounded-lg transition-colors ${
            isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isAdding ? (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            '+ New Load'
          )}
        </button>
      </div>
      
      {error && (
        <div className="p-4 mb-6 border-l-4 border-red-500 bg-red-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {usedLoads >= maxLoads && maxLoads > 0 && (
        <div className="p-4 mb-6 border-l-4 border-yellow-400 bg-yellow-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-bold">Load Limit Reached</span> - You've reached your limit of {maxLoads} loads. 
                <button 
                  onClick={() => document.querySelector('[data-section="upgrade"]').click()}
                  className="ml-1 font-medium text-blue-600 hover:underline"
                >
                  Upgrade to a paid plan
                </button> to post more loads.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {loads.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 rounded-xl">
          <svg className="w-12 h-12 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No loads yet</h3>
          <p className="mt-2 text-gray-500">Get started by creating your first load</p>
          <button
            onClick={handleAddLoad}
            disabled={isAdding}
            className={`mt-4 px-4 py-2 font-medium text-white rounded-lg ${
              isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            + Add First Load
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loads.map((load, index) => {
            const dates = `${load.start_date} to ${load.end_date}`;
            const formattedPrice = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(load.price);
            
            return (
              <div key={index} className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{load.load_id}</h3>
                      <p className="mt-1 font-medium text-gray-800">{load.name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      load.status === 'Open' ? 'bg-green-100 text-green-800' :
                      load.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                      load.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {load.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-600">Route</p>
                        <p className="font-medium text-gray-900">{load.route}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="text-gray-900">{load.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Material</p>
                        <p className="text-gray-900">{load.material}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-medium text-gray-900">{formattedPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dates</p>
                        <p className="text-gray-900">{dates}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-sm text-gray-600">Bids: </span>
                      <span className="ml-1 font-medium text-gray-900">{load.bids_count}</span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium ${
                      load.status === 'Open' 
                        ? 'text-blue-700 bg-blue-100 hover:bg-blue-200' 
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}>
                      {load.status === 'Open' ? 'Edit' : 'View Contract'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LoadManagement;