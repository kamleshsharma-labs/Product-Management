'use client';

export const verifyToken = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return false;
  }

  try {
    const verifyResponse = await fetch('http://localhost:3001/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    const verifyData = await verifyResponse.json();
    return verifyData.valid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

export const requireAuth = async (router: any): Promise<boolean> => {
  const isValid = await verifyToken();
  
  if (!isValid) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push("/login");
    return false;
  }
  
  return true;
};

export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};
