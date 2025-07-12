import React, { useState, useEffect } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { useAuth } from '../../context/AuthContext';

const VehicleManagement = () => {
  const { user } = useAuth();
  const { subscription, refreshSubscription } = useSubscription();
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    vehicleType: 'all',
    location: '',
    status: 'all',
    capacity: 'all',
    materialType: 'all'
  });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize subscription data properly
  const usedVehicles = subscription?.usedVehicles || 0;
  const maxVehicles = subscription?.vehicles || 0;
  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost/vahak/backend/vehicle.php', {
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
          setVehicles(data.vehicles);
        } else {
          setError('Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
        setError('Network error. Please try again.');
      }
    };
    
    if (user && user.token) {
      fetchVehicles();
    }
  }, [user]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      vehicleType: 'all',
      location: '',
      status: 'all',
      capacity: 'all',
      materialType: 'all'
    });
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (filters.search === '' || 
        vehicle.vehicle_id.toLowerCase().includes(filters.search.toLowerCase()) ||
        vehicle.plate.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.vehicleType === 'all' || vehicle.type === filters.vehicleType) &&
      (filters.location === '' || vehicle.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.status === 'all' || vehicle.status === filters.status) &&
      (filters.capacity === 'all' || vehicle.capacity === filters.capacity)
    );
  });

  const handleAddVehicle = async () => {
    if (usedVehicles >= maxVehicles) {
      alert('Vehicle limit reached! Please upgrade your plan.');
      return;
    }
    
    setIsAdding(true);
    setError('');
    
    const newVehicle = {
      id: `VH${(vehicles.length + 1).toString().padStart(3, '0')}`,
      plate: 'NEW-PLATE',
      type: 'Container Truck',
      capacity: '20 Tons',
      status: 'Available',
      driver: 'New Driver',
      location: 'New Location'
    };
    
    try {
      const response = await fetch('http://localhost/vahak/backend/vehicle.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          action: 'add',
          userId: user.id,
          vehicle: newVehicle
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setVehicles([...vehicles, { ...newVehicle, id: data.vehicleId }]);
        refreshSubscription();
      } else {
        setError(data.message || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error('Failed to add vehicle:', error);
      setError('Failed to add vehicle. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vehicle Management</h1>
          <p className="mt-2 text-gray-600">Manage your fleet efficiently</p>
        </div>
        <button 
          onClick={handleAddVehicle}
          disabled={isAdding}
          className={`mt-4 md:mt-0 px-4 py-2 font-medium text-white rounded-lg transition-colors ${
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
            '+ Add Vehicle'
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
      
      <div className="p-6 mb-8 bg-gray-50 rounded-xl">
        <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Filter & Search</h2>
          <button 
            onClick={clearFilters}
            className="px-4 py-2 mt-2 text-gray-700 transition-colors border border-gray-300 rounded-lg md:mt-0 hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search vehicles, loads..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Vehicle Type</label>
            <select
              name="vehicleType"
              value={filters.vehicleType}
              onChange={handleFilterChange}
              className="w-full py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Container Truck">Container Truck</option>
              <option value="Mini Truck">Mini Truck</option>
              <option value="Flatbed Truck">Flatbed Truck</option>
              <option value="Refrigerated Truck">Refrigerated Truck</option>
              <option value="Tanker Truck">Tanker Truck</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="City, State"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="In Transit">In Transit</option>
              <option value="Loading">Loading</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Capacity</label>
            <select
              name="capacity"
              value={filters.capacity}
              onChange={handleFilterChange}
              className="w-full py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Capacities</option>
              <option value="5 Tons">5 Tons</option>
              <option value="10 Tons">10 Tons</option>
              <option value="15 Tons">15 Tons</option>
              <option value="20 Tons">20 Tons</option>
              <option value="25+ Tons">25+ Tons</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Material Type</label>
            <select
              name="materialType"
              value={filters.materialType}
              onChange={handleFilterChange}
              className="w-full py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Materials</option>
              <option value="Electronics">Electronics</option>
              <option value="Textile">Textile</option>
              <option value="Food">Food</option>
              <option value="Construction">Construction</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Liquids">Liquids</option>
            </select>
          </div>
        </div>
      </div>
      
      {usedVehicles >= maxVehicles && maxVehicles > 0 && (
        <div className="p-4 mb-6 border-l-4 border-yellow-400 bg-yellow-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-bold">Vehicle Limit Reached</span> - You've reached your limit of {maxVehicles} vehicles. 
                <button 
                  onClick={() => document.querySelector('[data-section="upgrade"]').click()}
                  className="ml-1 font-medium text-blue-600 hover:underline"
                >
                  Upgrade to a paid plan
                </button> to add more vehicles.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {filteredVehicles.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 rounded-xl">
          <svg className="w-12 h-12 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No vehicles match your filters</h3>
          <p className="mt-2 text-gray-500">Try changing your filters or add a new vehicle</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle, index) => (
            <div key={index} className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vehicle.vehicle_id}</h3>
                    <p className="text-sm text-gray-600">{vehicle.plate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    vehicle.status === 'Loading' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="text-gray-900">{vehicle.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p className="text-gray-900">{vehicle.capacity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Driver</p>
                      <p className="text-gray-900">{vehicle.driver}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-gray-900">{vehicle.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 mt-6 border-t border-gray-200">
                  <button className="px-4 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;