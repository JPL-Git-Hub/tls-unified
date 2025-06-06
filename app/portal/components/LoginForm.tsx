'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { 
  Button, 
  FormInput, 
  ErrorMessage, 
  Card 
} from '@/components/ui/portal';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Direct Firebase Auth usage - no middleware or session cookies
      await signInWithEmailAndPassword(auth, email, password);
      // Authentication state is handled by onAuthStateChanged in the useAuth hook
    } catch (err: unknown) {
      // Direct error handling
      const errorMessage = err instanceof FirebaseError 
        ? err.message 
        : 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <Card className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Portal</h1>
          <p className="text-gray-600 mb-4">Please log in to access your documents</p>
          
          <form onSubmit={handleLogin}>
            <ErrorMessage>{error}</ErrorMessage>
            
            <FormInput
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <FormInput
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              isSubmitting={isSubmitting}
              className="w-full"
            >
              Log In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}