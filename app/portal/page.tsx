'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function PortalPage() {
  const { loading, isAdmin, isAttorney } = useAuth();
  const router = useRouter();

  // Redirect based on role
  useEffect(() => {
    if (!loading) {
      if (isAdmin) {
        router.push('/portal/admin');
      } else if (isAttorney) {
        router.push('/portal/attorney');
      }
      // For clients, we stay on the main portal page
    }
  }, [loading, isAdmin, isAttorney, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center min-h-24">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
      <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
        <p>No documents yet</p>
        <p className="text-sm mt-2">
          Your attorney will upload documents for you to review here.
        </p>
      </div>
    </div>
  );
}