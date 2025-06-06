'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateRandomId } from '@/lib/auth-helpers'; // We'll create this function

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Generate a client ID (8 alphanumeric characters)
      const clientId = generateRandomId(8);
      
      // Create client record
      const clientRef = await addDoc(collection(db, 'clients'), {
        name,
        email,
        phone,
        clientId, // Store the generated ID in the document
        service: 'general_legal',
        status: 'new_client',
        createdAt: new Date(),
      });
      
      // Redirect to registration page with email and clientId
      router.push(`/portal/register?email=${encodeURIComponent(email)}&clientId=${clientId}`);
    } catch (error) {
      console.error('Error creating client record:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-header mb-12">
          <h1 className="tls-title text-5xl lg:text-6xl mb-6">
            The Law Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional legal services tailored to your needs
          </p>
        </div>
        
        <div className="tls-card">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started Today:</h2>
            <p className="text-gray-700 mb-4">Fill out the form below to create your client portal account. Your portal gives you access to:</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Document management and secure sharing
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Direct communication with your legal team
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Case status updates and timeline
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Appointment scheduling
              </li>
            </ul>
          </div>

          <form className="tls-form mb-8" onSubmit={handleSubmit}>
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
              {isLoading ? 'Processing...' : 'Create Client Portal'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Your information is secure and private
          </p>
        </div>
      </div>
    </div>
  );
}