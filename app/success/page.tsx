'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Thank you for choosing The Law Shop for your home closing legal services.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What happens next?</h2>
            <ul className="space-y-3 text-gray-700 text-left mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">1.</span>
                We'll contact you within 24 hours to schedule your initial consultation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">2.</span>
                Our team will begin reviewing your transaction details
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">3.</span>
                We'll coordinate with all parties to ensure a smooth closing process
              </li>
            </ul>

            {sessionId && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  Transaction ID: <span className="font-mono">{sessionId}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Link
                href="/portal"
                className="inline-block bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200"
              >
                Access Client Portal
              </Link>
              <br />
              <Link
                href="/"
                className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

