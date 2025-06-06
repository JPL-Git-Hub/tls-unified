'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Success() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client_id');
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const phone = searchParams.get('phone');

  return (
    <div className="tls-page flex items-center justify-center">
      <div className="tls-container max-w-md">
        <div className="tls-card flex flex-col items-center justify-center py-12">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-center mb-12">
            Application Submitted!
          </h1>

          <Link
            href={`/portal/register?email=${encodeURIComponent(email || '')}&clientId=${clientId || ''}`}
            className="tls-button bg-green-600 hover:bg-green-700 text-xl py-4 px-8 w-full"
          >
            Register for Client Portal
          </Link>
        </div>
      </div>
    </div>
  );
}