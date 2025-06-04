/**
 * Firebase Admin SDK Test
 *
 * This script tests the Firebase Admin SDK connection.
 * Run it with: npx ts-node lib/test-firebase-admin.ts
 */

import { adminDb, adminAuth, adminStorage } from './firebase-admin.mjs';

async function testFirebaseAdmin() {
  console.log('Testing Firebase Admin SDK connection...');

  try {
    // Test Firestore connection
    console.log('Testing Firestore...');
    const timestamp = new Date().toISOString();
    await adminDb.collection('test').doc('connection-test').set({
      message: 'Connection successful',
      timestamp,
    });
    console.log('✅ Firestore connection successful');

    // Test Auth connection
    console.log('\nTesting Authentication...');
    const listUsers = await adminAuth.listUsers(1);
    console.log(`✅ Auth connection successful (${listUsers.users.length} users found)`);

    // Test Storage connection
    console.log('\nTesting Storage...');
    const bucket = adminStorage.bucket();
    console.log(`✅ Storage connection successful (bucket: ${bucket.name})`);

    console.log('\n🎉 All Firebase Admin SDK connections are working!');
  } catch (error) {
    console.error('❌ Error testing Firebase Admin SDK:', error);
    process.exit(1);
  }
}

testFirebaseAdmin();
