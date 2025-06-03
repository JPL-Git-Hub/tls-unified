import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Import service account key
// Note: This import requires a module declaration for JSON files
// Add to tsconfig.json: "resolveJsonModule": true, "esModuleInterop": true
import serviceAccount from './firebase-admin-key.json';

// Check if the Firebase Admin SDK has already been initialized
const adminApp = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.appspot.com`,
    })
  : getApps()[0];

// Initialize Firestore, Auth, and Storage
const adminDb = getFirestore(adminApp);
const adminAuth = getAuth(adminApp);
const adminStorage = getStorage(adminApp);

export { adminApp, adminDb, adminAuth, adminStorage };
