'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

// Admin dashboard page - only accessible by admins
export default function AdminPortal() {
  const { loading, isAdmin } = useAuth();
  const router = useRouter();

  // Redirect if not admin
  if (!loading && !isAdmin) {
    router.push('/portal');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Don't render anything if not admin (will redirect)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-lg font-bold">15</p>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-lg font-bold">3</p>
            <p className="text-sm text-gray-600">Attorneys</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-lg font-bold">42</p>
            <p className="text-sm text-gray-600">Documents</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">User Management</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">admin@thelawshop.com</td>
              <td className="p-2"><span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Admin</span></td>
              <td className="p-2">-</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">attorney@thelawshop.com</td>
              <td className="p-2"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Attorney</span></td>
              <td className="p-2">
                <button className="text-xs text-gray-600 hover:text-red-600">Remove</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-2">client@example.com</td>
              <td className="p-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Client</span></td>
              <td className="p-2">
                <button className="text-xs text-gray-600 hover:text-red-600 mr-2">Remove</button>
                <button className="text-xs text-gray-600 hover:text-blue-600">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">System Settings</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Note: These are placeholder settings for demonstration purposes.</p>
          <div className="flex items-center mb-2">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Email notifications</span>
            </label>
          </div>
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Two-factor authentication</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}