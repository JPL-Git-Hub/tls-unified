'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function ClientPortal() {
  const { clientId } = useParams();
  const { user, loading, isAdmin, isAttorney } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  if (!loading && !user) {
    router.push('/portal');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Client Portal</h2>
        <p className="text-sm text-gray-500">Client ID: {clientId}</p>
      </div>

      {/* Admin and attorney see additional controls */}
      {(isAdmin || isAttorney) && (
        <div className="mb-6 bg-gray-50 p-4 rounded border border-gray-200">
          <h3 className="text-md font-medium mb-2 flex items-center">
            {isAdmin ? 
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-2">Admin View</span> : 
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">Attorney View</span>
            }
            Client Management
          </h3>
          
          <div className="flex space-x-2 mb-4">
            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Upload Document
            </button>
            <button className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Send Message
            </button>
            {isAdmin && (
              <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                Edit Permissions
              </button>
            )}
          </div>
          
          <div className="text-sm">
            <p className="font-medium">Client Notes:</p>
            <p className="text-gray-600 text-sm">Initial consultation completed on May 15, 2023.</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
        <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
          <p>No documents yet</p>
          <p className="text-sm mt-2">
            Your attorney will upload documents for you to review here.
          </p>
        </div>
      </div>
    </div>
  );
}
