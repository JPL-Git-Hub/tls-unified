'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { 
  Button, 
  FormInput, 
  ErrorMessage, 
  HeroBanner 
} from '@/components/ui';

export default function ClientIntake() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HeroBanner>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">The Law Shop - Coming Soon</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage>{error}</ErrorMessage>
        
        <FormInput
          name="name"
          type="text"
          placeholder="Full Name"
          required
        />

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <FormInput
          name="phone"
          type="tel"
          placeholder="Phone"
          required
        />

        <Button
          type="submit"
          fullWidth
          isSubmitting={isSubmitting}
        >
          Create My Portal
        </Button>
      </form>
    </HeroBanner>
  );
}
