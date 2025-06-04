'use client';

export default function PortalPage() {
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