import React from 'react';

const Pricing = () => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '299/month',
      description: 'Perfect for small transporters',
      features: [
        'Up to 5 vehicle registrations',
        'Basic load posting & bidding',
        'Email & WhatsApp support',
        'Mobile app access',
        'Basic trip reports',
        'Commission: 2% per booking'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '499/month',
      description: 'Most popular for growing businesses',
      features: [
        'Up to 25 vehicle registrations',
        'Advanced load management',
        'Real-time GPS tracking',
        'Priority customer support',
        'Detailed analytics & reports',
        'Multi-city operations',
        'Commission: 1.5% per booking',
        'Fast payment settlement'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '999/month',
      description: 'For large fleet operators',
      features: [
        'Unlimited vehicle registrations',
        'Complete fleet management',
        'Advanced route optimization',
        'Dedicated account manager',
        'Custom integrations & API',
        'White-label solutions',
        'Commission: 1% per booking',
        'Instant payment settlement',
        'Fuel management system'
      ],
      popular: false
    }
  ];

  return (
    <div className="px-4 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-2 text-3xl font-bold text-center md:text-4xl">Choose Your Plan</h1>
        <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600">
          Transparent pricing for every business size. No hidden fees, no setup charges.
        </p>
        
        <div className="max-w-2xl p-4 mx-auto mb-12 text-center border border-yellow-200 rounded-lg bg-yellow-50">
          <p className="font-bold text-yellow-800">
            Special Launch Offer: Get 2 months FREE on annual plans!
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] ${
                plan.popular ? 'ring-2 ring-blue-500 relative' : 'bg-white'
              }`}
            >
              {plan.popular && (
                <div className="py-1 text-center text-white bg-blue-500">
                  <span className="font-bold">MOST POPULAR</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-1 text-3xl font-bold text-blue-600">{plan.price}</p>
                <p className="mb-6 text-gray-600">{plan.description}</p>
                
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-bold transition-all duration-300 hover:scale-[1.03] ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}>
                  Sign Up & Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-8 text-center text-gray-600">
          No setup fee • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default Pricing;