import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Use a placeholder during build time to prevent build errors
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, productName, successUrl, cancelUrl, clientData } = await request.json();
    
    // Create the client record first
    const clientRef = await addDoc(collection(db, 'clients'), {
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      service: 'home_closing',
      amount: amount,
      status: 'pending_payment',
      createdAt: new Date(),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: 'Professional legal services for home closing',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        service: 'home_closing',
        amount: amount.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

