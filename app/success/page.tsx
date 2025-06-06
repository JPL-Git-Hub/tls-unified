'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Success() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client_id');
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const phone = searchParams.get('phone');


  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-card">
          <div className="tls-header">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="tls-title">
              Application Submitted!
            </h1>
            <p className="tls-subtitle">
              Thank you for choosing The Law Shop for your home closing legal services.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What happens next?</h2>
            <ul className="space-y-3 text-gray-700 text-left mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">1.</span>
                We&apos;ll contact you within 24 hours to schedule your initial consultation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">2.</span>
                Our team will begin reviewing your transaction details
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">3.</span>
                We&apos;ll coordinate with all parties to ensure a smooth closing process
              </li>
            </ul>

            {clientId && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  Client ID: <span className="font-mono">{clientId}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Link
                href={`/portal/register?email=${encodeURIComponent(email || '')}&clientId=${clientId || ''}`}
                className="tls-button bg-green-600 hover:bg-green-700"
              >
                Register for Client Portal
              </Link>
              <Link
                href="/portal"
                className="tls-button"
              >
                Access Client Portal
              </Link>
              <Link
                href="/"
                className="tls-button"
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

