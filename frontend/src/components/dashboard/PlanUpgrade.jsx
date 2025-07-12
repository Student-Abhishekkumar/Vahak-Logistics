import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

const PlanUpgrade = () => {
  const { subscription, upgradePlan } = useSubscription();
  
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0/month',
      description: 'Perfect for small transporters',
      features: [
        'Up to 2 vehicle registrations',
        'Up to 2 active loads',
        'Basic load posting & bidding',
        'Email & WhatsApp support',
        'Mobile app access',
        'Basic trip reports'
      ],
      button: 'Current Plan',
      buttonColor: 'bg-gray-200 text-gray-800'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '₹299/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 5 vehicle registrations',
        'Up to 10 active loads',
        'Advanced load management',
        'Real-time GPS tracking',
        'Priority customer support',
        'Detailed analytics & reports',
        'Multi-city operations'
      ],
      button: 'Upgrade',
      buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '₹499/month',
      description: 'Most popular for established businesses',
      features: [
        'Up to 25 vehicle registrations',
        'Up to 50 active loads',
        'Complete fleet management',
        'Advanced route optimization',
        'Dedicated account manager',
        'Custom integrations & API',
        'White-label solutions'
      ],
      button: 'Upgrade',
      buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  ];

  const handleUpgrade = async (planId) => {
    try {
      await upgradePlan(planId);
      alert(`Successfully upgraded to ${planId} plan!`);
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Upgrade failed. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Upgrade Your Plan</h1>
      <p className="mb-8 text-muted-foreground">Choose the plan that fits your business needs</p>
      
      <div className="max-w-3xl p-4 mb-8 border border-yellow-200 rounded-lg bg-yellow-50">
        <p className="font-bold text-yellow-800">
          Special Launch Offer: Get 2 months FREE on annual plans!
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`rounded-xl overflow-hidden ${
              plan.id === subscription.plan ? 'border-blue-500 ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.id === subscription.plan && (
              <div className="py-1 text-center text-white bg-blue-500">
                <span className="font-bold">CURRENT PLAN</span>
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-3xl font-bold text-blue-600">{plan.price}</p>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleUpgrade(plan.id)}
                disabled={plan.id === subscription.plan}
                className={`w-full ${
                  plan.id === subscription.plan 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {plan.id === subscription.plan ? 'Current Plan' : plan.button}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanUpgrade;