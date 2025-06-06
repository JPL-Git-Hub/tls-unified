'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeClosing() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 300000,
          productName: 'Home Closing Legal Services',
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
          cancelUrl: `${window.location.origin}/home-closing`,
          clientData: { name, email, phone },
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
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-header">
          <h1 className="tls-title">Home Closing Legal Services</h1>
        </div>
        
        <div className="tls-card">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What&apos;s Included:</h2>
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

          <form className="tls-form mb-8" onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}>
            <div className="tls-field">
              <label className="tls-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="tls-input"
                placeholder="Your full name"
              />
            </div>

            <div className="tls-field">
              <label className="tls-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="tls-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="tls-field">
              <label className="tls-label">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="tls-input"
                placeholder="(555) 123-4567"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="tls-button"
            >
              {isLoading ? 'Processing...' : 'Secure Payment with Stripe'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Secure payment processing powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

