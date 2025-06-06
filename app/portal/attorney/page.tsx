'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

// Attorney dashboard page - only accessible by attorneys
export default function AttorneyPortal() {
  const { loading, isAttorney } = useAuth();
  const router = useRouter();

  // Redirect if not attorney
  if (!loading && !isAttorney) {
    router.push('/portal');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Don't render anything if not attorney (will redirect)
  if (!isAttorney) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Attorney Dashboard</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Your Clients</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Last Activity</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-gray-600">client1@example.com</div>
                </div>
              </td>
              <td className="p-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span></td>
              <td className="p-2 text-sm">2 days ago</td>
              <td className="p-2">
                <button className="text-xs text-blue-600 hover:text-blue-800 mr-2">View</button>
                <button className="text-xs text-gray-600 hover:text-gray-800">Message</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-2">
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-gray-600">client2@example.com</div>
                </div>
              </td>
              <td className="p-2"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span></td>
              <td className="p-2 text-sm">5 days ago</td>
              <td className="p-2">
                <button className="text-xs text-blue-600 hover:text-blue-800 mr-2">View</button>
                <button className="text-xs text-gray-600 hover:text-gray-800">Message</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-2">
                <div>
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">client3@example.com</div>
                </div>
              </td>
              <td className="p-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span></td>
              <td className="p-2 text-sm">Today</td>
              <td className="p-2">
                <button className="text-xs text-blue-600 hover:text-blue-800 mr-2">View</button>
                <button className="text-xs text-gray-600 hover:text-gray-800">Message</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Document Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <h4 className="font-medium">Estate Planning Package</h4>
            <p className="text-sm text-gray-600 mb-2">Basic documents for estate planning</p>
            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Use Template</button>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-medium">LLC Formation</h4>
            <p className="text-sm text-gray-600 mb-2">Documents for forming an LLC</p>
            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Use Template</button>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-medium">Real Estate Purchase</h4>
            <p className="text-sm text-gray-600 mb-2">Documents for real estate transactions</p>
            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Use Template</button>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-medium">Divorce Filings</h4>
            <p className="text-sm text-gray-600 mb-2">Divorce and family law documents</p>
            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  );
}