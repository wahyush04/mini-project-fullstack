// src/hooks/useApi.ts
import { useCallback, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// Typed hook for handling API errors
export const useApiError = (
  error: Error | AxiosError | null, 
  onError?: (error: Error | AxiosError) => void
) => {
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);
  
  const getErrorMessage = useCallback(() => {
    if (!error) return '';
    
    if (axios.isAxiosError(error)) {
      // Extract message from Axios error response if available
      return error.response?.data?.message || error.message;
    }
    
    return error.message;
  }, [error]);
  
  return { getErrorMessage };
};
