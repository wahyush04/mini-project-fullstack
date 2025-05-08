// import { AxiosError, AxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';

// Generic API state interface
export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | AxiosError | null;
  status: 'idle' | 'loading' | 'success' | 'error';
}

// Default initial state creator
export const createInitialState = <T>(): ApiState<T> => ({
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  status: 'idle',
});

// Generic API response format (adjust to match your backend)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Common entity types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API method types
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
