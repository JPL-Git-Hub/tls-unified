'use client';

import { User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Extended user type with role
type UserWithRole = User & {
  role?: 'admin' | 'attorney' | 'client';
};

interface PortalHeaderProps {
  user: UserWithRole;
}

export default function PortalHeader({ user }: PortalHeaderProps) {
  const handleLogout = async () => {
    try {
      // Direct Firebase Auth signOut
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get portal title based on role
  const getPortalTitle = () => {
    switch (user.role) {
      case 'admin':
        return 'Admin Portal';
      case 'attorney':
        return 'Attorney Portal';
      case 'client':
      default:
        return 'Client Portal';
    }
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'attorney':
        return 'bg-blue-100 text-blue-800';
      case 'client':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{getPortalTitle()}</h1>
        <button 
          onClick={handleLogout} 
          className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
      <div className="flex items-center mt-2">
        <p className="text-gray-600 mr-2">Welcome, {user.email}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor()}`}>
          {user.role || 'client'}
        </span>
      </div>
    </div>
  );
}