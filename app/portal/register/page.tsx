'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';

// User registration page - direct Firebase Auth implementation
// After registration, user is redirected to their portal page

export default function PortalRegister() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const clientIdParam = searchParams.get('clientId');

    if (emailParam) setEmail(emailParam);
    if (clientIdParam) setClientId(clientIdParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the user account using direct Firebase Auth
      // No session cookies needed as we're using client-side auth only
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Navigate to the client portal
      router.push(`/portal/${clientId}`);
    } catch (error: unknown) {
      console.error('Error creating account:', error);
      const errorMessage = error instanceof FirebaseError ? error.message : 'Unknown error occurred';
      setError('Error creating account: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-header">
          <h1 className="tls-title">Create Your Portal</h1>
          <p className="tls-subtitle">Set up your secure client portal access</p>
          <p className="text-sm text-gray-500 mt-1">{email}</p>
        </div>

        <div className="tls-card">
          {error && (
            <div className="tls-error">
              <p className="tls-error-text">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="tls-form">
            <div className="tls-field">
              <label className="tls-label">Password</label>
              <input
                type="password"
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="tls-input"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="tls-button"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
