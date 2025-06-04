'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

export default function ClientIntake() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      createdAt: new Date(),
      status: 'intake',
    };

    try {
      const docRef = await addDoc(collection(db, 'clients'), clientData);
      router.push(`/portal/register?clientId=${docRef.id}&email=${clientData.email}`);
    } catch (error: unknown) {
      console.error('Error creating client:', error);
      const errorMessage = error instanceof FirebaseError ? 
        (error as FirebaseError).message : 'Error creating your portal. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center max-w-md w-full px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">The Law Shop - Coming Soon</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Creating Portal...' : 'Create My Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
