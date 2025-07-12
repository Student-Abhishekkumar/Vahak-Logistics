import React from 'react';
import { Link } from 'react-router-dom';

const ProfessionalFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-16 pb-8 text-white bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center mb-6">
              <div className="px-3 py-2 mr-2 text-xl font-bold text-white bg-blue-700 rounded">
                Vahak
              </div>
              <span className="text-xl font-bold">Logistics</span>
            </div>
            <p className="mb-6 leading-relaxed text-gray-400">
              India's leading logistics platform connecting businesses with verified transporters for seamless goods movement.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-800 rounded-full hover:bg-blue-700"
                >
                  <span className="sr-only">{social}</span>
                  <div className="text-white">
                    {social === 'facebook' && 'f'}
                    {social === 'twitter' && 't'}
                    {social === 'linkedin' && 'in'}
                    {social === 'instagram' && 'ig'}
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Careers', path: '/careers' },
                { name: 'Blog', path: '/blog' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-bold">Services</h3>
            <ul className="space-y-3">
              {[
                { name: 'Load Booking', path: '/services/load-booking' },
                { name: 'Vehicle Tracking', path: '/services/vehicle-tracking' },
                { name: 'Fleet Management', path: '/services/fleet-management' },
                { name: 'Analytics', path: '/services/analytics' },
                { name: 'Route Optimization', path: '/services/route-optimization' },
                { name: 'Payment Solutions', path: '/services/payment-solutions' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Sector 44, Gurgaon Haryana 122003, India</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@vahak.in</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="mb-3 font-bold">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 text-gray-800 rounded-l-lg focus:outline-none"
                />
                <button className="px-4 text-white transition-colors bg-blue-700 rounded-r-lg hover:bg-blue-800">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-gray-800 md:flex-row">
          <p className="mb-4 text-sm text-gray-500 md:mb-0">
            © {currentYear} Vahak Logistics. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="text-sm text-gray-500 transition-colors hover:text-gray-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;