'use client';

import { User } from 'firebase/auth';
import { useAuth } from '@/lib/useAuth';
import LoginForm from './components/LoginForm';
import PortalHeader from './components/PortalHeader';

// User type with role
type UserWithRole = User & {
  role: 'admin' | 'attorney' | 'client';
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, isAttorney } = useAuth();

  // Add role to user object for components that expect it
  const userWithRole = user ? {
    ...user,
    role: isAdmin ? 'admin' : isAttorney ? 'attorney' : 'client'
  } as UserWithRole : null;

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
    return <LoginForm />;
  }

  // If authenticated, render portal content with role info
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <PortalHeader user={userWithRole!} />
        {children}
      </div>
    </div>
  );
}
