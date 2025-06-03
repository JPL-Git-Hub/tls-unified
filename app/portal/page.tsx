'use client';

// Include Firebase import for console testing only
import { auth } from '../../lib/firebase';

export default function PortalPage() {
  // Log Firebase Auth status to console for testing
  console.log('Firebase Auth status:', auth ? 'Initialized' : 'Not initialized');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Portal</h1>
          <p className="text-gray-600">Authentication coming soon</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
            <p>Please log in to access your documents</p>
            <p className="text-sm mt-2">
              This portal provides secure access to your case information and documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}