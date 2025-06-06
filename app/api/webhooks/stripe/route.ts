import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Use placeholders during build time to prevent build errors
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const clientData = session.metadata;

      if (!clientData?.pendingClientId) {
        throw new Error('No pending client ID found');
      }

      // Find the pending client record
      const clientsRef = collection(db, 'clients');
      const q = query(clientsRef, where('pendingClientId', '==', clientData.pendingClientId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('No pending client found');
      }

      const clientDoc = querySnapshot.docs[0];

      // Update client status and add payment info
      await updateDoc(clientDoc.ref, {
        status: 'payment_complete',
        paymentId: session.id,
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

