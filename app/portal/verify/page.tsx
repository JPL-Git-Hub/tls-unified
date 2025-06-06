'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/portal';

export default function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const clientIdParam = searchParams.get('clientId');

    if (emailParam) setEmail(emailParam);
    if (clientIdParam) setClientId(clientIdParam);
    
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setIsVerified(true);
          
          // Redirect to portal after verification
          if (clientIdParam) {
            setTimeout(() => {
              router.push(`/portal/${clientIdParam}`);
            }, 2000);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [searchParams, router]);

  // Handle resend verification email
  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        
        // Set cooldown for 60 seconds
        setResendCooldown(60);
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError('You need to be logged in to resend verification email.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setError('Failed to send verification email. Please try again later.');
    }
  };

  // Handle check verification status
  const handleCheckVerification = async () => {
    try {
      // Reload the user to get the latest verification status
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          setIsVerified(true);
          
          // Redirect to portal after verification
          if (clientId) {
            setTimeout(() => {
              router.push(`/portal/${clientId}`);
            }, 2000);
          }
        } else {
          setError('Email not verified yet. Please check your inbox and click the verification link.');
        }
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-card">
          <div className="tls-header">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="tls-title">Verify Your Email</h1>
            <p className="tls-subtitle">
              {isVerified 
                ? 'Your email has been verified successfully!' 
                : 'We\'ve sent a verification email to your inbox.'}
            </p>
            {email && <p className="text-sm text-gray-500 mt-1">{email}</p>}
          </div>

          <div className="border-t border-gray-200 pt-8">
            {isVerified ? (
              <div className="text-center">
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <p className="text-green-700">
                    Email verified successfully! Redirecting to your client portal...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Next steps:</h2>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    <li>Check your email inbox for a verification link</li>
                    <li>Click the link in the email to verify your account</li>
                    <li>If you don&apos;t see the email, check your spam folder</li>
                    <li>After verification, you&apos;ll be able to access your client portal</li>
                  </ol>
                </div>

                {error && (
                  <div className="bg-red-50 p-4 rounded-lg mb-6">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={handleCheckVerification}
                    className="w-full"
                  >
                    I&apos;ve Verified My Email
                  </Button>
                  
                  <Button 
                    onClick={handleResendVerification}
                    disabled={resendCooldown > 0}
                    className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    {resendCooldown > 0 
                      ? `Resend Email (${resendCooldown}s)` 
                      : 'Resend Verification Email'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}