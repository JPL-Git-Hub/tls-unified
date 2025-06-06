'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { 
  Button, 
  FormInput, 
  ErrorMessage, 
  HeroBanner 
} from '@/components/ui';

export default function ClientIntake() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      createdAt: new Date(),
      status: 'intake',
    };

    try {
      const docRef = await addDoc(collection(db, 'clients'), clientData);
      router.push(`/portal/register?clientId=${docRef.id}&email=${clientData.email}`);
    } catch (error: unknown) {
      console.error('Error creating client:', error);
      const errorMessage = error instanceof FirebaseError ? 
        (error as FirebaseError).message : 'Error creating your portal. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-header">
          <h1 className="tls-title">
            Schedule First Consult
          </h1>
          <p className="tls-subtitle">
            Tell us about your legal needs and we'll get back to you within 24 hours
          </p>
        </div>
        
        <div className="tls-card">
          {error && (
            <div className="tls-error">
              <p className="tls-error-text">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="tls-form">
            <div className="tls-field">
              <label className="tls-label">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                required
                className="tls-input"
              />
            </div>

            <div className="tls-field">
              <label className="tls-label">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="tls-input"
              />
            </div>

            <div className="tls-field">
              <label className="tls-label">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                required
                className="tls-input"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="tls-button"
            >
              {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
