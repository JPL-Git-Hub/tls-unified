import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Hardcoded admin and attorney emails
const ADMIN_EMAILS = ['admin@thelawshop.com'];
const ATTORNEY_EMAILS = ['attorney@thelawshop.com', 'lawyer@thelawshop.com'];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const isAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;
  const isAttorney = user ? ATTORNEY_EMAILS.includes(user.email || '') : false;
  const isClient = user && !isAdmin && !isAttorney;
  
  return { user, loading, isAdmin, isAttorney, isClient };
}