import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin with environment variables
const createFirebaseAdminApp = () => {
  // Check if app is already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // If we're in a development environment, use emulator
  if (process.env.NODE_ENV === 'development') {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  }

  // For production, use project credentials from environment variables
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    console.warn(
      'Missing Firebase Admin credentials. Using minimal configuration for development.'
    );
    
    // Use minimal project configuration for development
    return initializeApp({
      projectId: projectId || 'tls-unified-dev',
    });
  }

  // Initialize with credentials
  return initializeApp({
    credential: cert({
      clientEmail,
      privateKey,
      projectId,
    }),
    storageBucket: `${projectId}.appspot.com`,
  });
};

// Initialize admin app
const adminApp = createFirebaseAdminApp();

// Initialize Firestore, Auth, and Storage
const adminDb = getFirestore(adminApp);
const adminAuth = getAuth(adminApp);
const adminStorage = getStorage(adminApp);

export { adminApp, adminDb, adminAuth, adminStorage };
