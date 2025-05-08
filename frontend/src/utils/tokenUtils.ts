export const getHeaders = () => {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    
    // Add authentication if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  };