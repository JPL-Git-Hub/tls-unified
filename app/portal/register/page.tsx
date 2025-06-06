'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';
import { FormInput, ErrorMessage, Button } from '@/components/ui/portal';

// Form event types
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;

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

  const validateClientId = (id: string): boolean => {
    // Client ID must be alphanumeric and 8 characters
    return /^[A-Za-z0-9]{8}$/.test(id);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Client ID validation
    if (!validateClientId(clientId)) {
      setError('Invalid client ID. It must be 8 alphanumeric characters.');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Please enter a password that is at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('The passwords you entered do not match. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the user account using direct Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      // Navigate to a verification page or the portal
      router.push(`/portal/verify?email=${encodeURIComponent(email)}&clientId=${clientId}`);
    } catch (error: unknown) {
      console.error('Error creating account:', error);
      const errorMessage = error instanceof FirebaseError 
        ? error.message.replace('Firebase: ', '').replace(/\([^)]*\)/, '') // Clean up Firebase error messages
        : 'We encountered an unexpected error while creating your account. Please try again.';
      setError(errorMessage);
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
          <ErrorMessage>{error}</ErrorMessage>
          
          <form onSubmit={handleSubmit} className="tls-form">
            <FormInput
              label="Client ID"
              type="text"
              value={clientId}
              onChange={(e: InputEvent) => setClientId(e.target.value)}
              placeholder="Enter your 8-character client ID"
              required
              maxLength={8}
              pattern="[A-Za-z0-9]{8}"
              title="Client ID must be 8 alphanumeric characters"
            />

            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={(e: InputEvent) => setPassword(e.target.value)}
              placeholder="Enter a password (minimum 6 characters)"
              required
              minLength={6}
            />

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e: InputEvent) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              minLength={6}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
