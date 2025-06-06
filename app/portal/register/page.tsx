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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center max-w-md w-full px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">The Law Shop - Coming Soon</h1>

        <div className="mb-6">
          <p className="text-gray-600">Create your portal password</p>
          <p className="text-sm text-gray-500 mt-1">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded text-left">
              {error}
            </div>
          )}
          
          <div>
            <input
              type="password"
              placeholder="Password (minimum 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Portal Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
