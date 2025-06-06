// Helper function to set session cookie
export async function setSessionCookie(idToken: string) {
  try {
    // Call your backend API to set the cookie
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to set session cookie');
    }

    return true;
  } catch (error) {
    console.error('Error setting session cookie:', error);
    return false;
  }
}