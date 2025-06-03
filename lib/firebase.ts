import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Connect to emulators in development environment
if (process.env.NODE_ENV === 'development') {
  // Connect to Auth emulator
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  
  // Connect to Firestore emulator
  connectFirestoreEmulator(db, 'localhost', 8080)
  
  console.log('Connected to Firebase emulators - Auth:9099, Firestore:8080')
} else {
  console.log('Using production Firebase services')
}

export { auth, db }