'use client';

import { useParams } from 'next/navigation';

export default function ClientPortal() {
  const { clientId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your Law Shop Portal</h1>
          <p className="text-gray-600">Client ID: {clientId}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
          <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
            <p>No documents yet</p>
            <p className="text-sm mt-2">
              Your attorney will upload documents for you to review here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
