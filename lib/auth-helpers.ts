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

/**
 * Generate a random alphanumeric ID of specified length
 * @param length The length of the ID to generate
 * @returns A random alphanumeric string
 */
export function generateRandomId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Create a Uint8Array of the required length
  const randomValues = new Uint8Array(length);
  
  // Fill the array with random values
  window.crypto.getRandomValues(randomValues);
  
  // Use the random values to select characters
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % characters.length);
  }
  
  return result;
}