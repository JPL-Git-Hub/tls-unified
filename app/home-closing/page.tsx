'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeClosing() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 300000, // $3,000 in cents
          productName: 'Home Closing Legal Services',
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/home-closing`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Home Closing Legal Services
            </h1>
            <p className="text-gray-600 text-lg">
              Professional legal representation for your home closing
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Included:</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Document review and preparation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Title examination and clearance
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Closing coordination and attendance
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Legal consultation throughout the process
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Post-closing document filing
                </li>
              </ul>
            </div>

            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">$3,000</div>
              <p className="text-gray-600">Complete home closing legal services</p>
            </div>

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-black text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200 text-lg disabled:bg-gray-400"
            >
              {isLoading ? 'Processing...' : 'Secure Payment with Stripe'}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Secure payment processing powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

