'use client';

import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const errorMessage = err instanceof FirebaseError ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Login form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Portal</h1>
            <p className="text-gray-600 mb-4">Please log in to access your documents</p>
            
            <form onSubmit={handleLogin}>
              {error && <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded">{error}</div>}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, render portal content with logout button in header
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
            <button 
              onClick={() => auth.signOut()} 
              className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
          <p className="text-gray-600 mt-2">Welcome, {user.email}</p>
        </div>
        
        {children}
      </div>
    </div>
  );
}