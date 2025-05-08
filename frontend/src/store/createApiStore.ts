import { create } from 'zustand';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import apiClient from '../lib/axios';
import type { ApiState } from '../types/api';
import { createInitialState } from '../types/api';

// Interface for the API Store
export interface ApiStore<T> {
  // State
  state: ApiState<T>;
  
  // Basic Actions
  setLoading: () => void;
  setData: (data: T) => void;
  setError: (error: Error | AxiosError) => void;
  reset: () => void;
  
  // API Actions
  fetch: (url: string, config?: AxiosRequestConfig) => Promise<T | null>;
  post: <D>(url: string, data: D, config?: AxiosRequestConfig) => Promise<T | null>;
  put: <D>(url: string, data: D, config?: AxiosRequestConfig) => Promise<T | null>;
  patch: <D>(url: string, data: D, config?: AxiosRequestConfig) => Promise<T | null>;
  remove: (url: string, config?: AxiosRequestConfig) => Promise<T | null>;
}

// Function to create a typed API store
export const createApiStore = <T>() => {
  return create<ApiStore<T>>((set) => ({
    // Initial state
    state: createInitialState<T>(),
    
    // Basic actions to update state
    setLoading: () => set((store) => ({
      state: {
        ...store.state,
        isLoading: true,
        status: 'loading',
        isError: false,
        error: null
      }
    })),
    
    setData: (data: T) => set({
      state: {
        data,
        isLoading: false,
        isError: false,
        error: null,
        status: 'success'
      }
    }),
    
    setError: (error: Error | AxiosError) => set({
      state: {
        data: null,
        isLoading: false,
        isError: true,
        error,
        status: 'error'
      }
    }),
    
    reset: () => set({
      state: createInitialState<T>()
    }),
    
    // API actions
    fetch: async (url: string, config?: AxiosRequestConfig) => {
      try {
        set((store) => ({
          state: { ...store.state, isLoading: true, status: 'loading', isError: false, error: null }
        }));
        
        const response = await apiClient.get<T>(url, config);
        const data = response.data;
        
        set({ state: { data, isLoading: false, isError: false, error: null, status: 'success' } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        set({ 
          state: { 
            data: null, 
            isLoading: false, 
            isError: true, 
            error: axiosError, 
            status: 'error'
          } 
        });
        return null;
      }
    },
    
    post: async <D>(url: string, data: D, config?: AxiosRequestConfig) => {
      try {
        set((store) => ({
          state: { ...store.state, isLoading: true, status: 'loading', isError: false, error: null }
        }));
        
        const response = await apiClient.post<T>(url, data, config);
        const responseData = response.data;
        
        set({ state: { data: responseData, isLoading: false, isError: false, error: null, status: 'success' } });
        return responseData;
      } catch (error) {
        const axiosError = error as AxiosError;
        set({ 
          state: { 
            data: null, 
            isLoading: false, 
            isError: true, 
            error: axiosError, 
            status: 'error'
          } 
        });
        return null;
      }
    },
    
    put: async <D>(url: string, data: D, config?: AxiosRequestConfig) => {
      try {
        set((store) => ({
          state: { ...store.state, isLoading: true, status: 'loading', isError: false, error: null }
        }));
        
        const response = await apiClient.put<T>(url, data, config);
        const responseData = response.data;
        
        set({ state: { data: responseData, isLoading: false, isError: false, error: null, status: 'success' } });
        return responseData;
      } catch (error) {
        const axiosError = error as AxiosError;
        set({ 
          state: { 
            data: null, 
            isLoading: false, 
            isError: true, 
            error: axiosError, 
            status: 'error'
          } 
        });
        return null;
      }
    },
    
    patch: async <D>(url: string, data: D, config?: AxiosRequestConfig) => {
      try {
        set((store) => ({
          state: { ...store.state, isLoading: true, status: 'loading', isError: false, error: null }
        }));
        
        const response = await apiClient.patch<T>(url, data, config);
        const responseData = response.data;
        
        set({ state: { data: responseData, isLoading: false, isError: false, error: null, status: 'success' } });
        return responseData;
      } catch (error) {
        const axiosError = error as AxiosError;
        set({ 
          state: { 
            data: null, 
            isLoading: false, 
            isError: true, 
            error: axiosError, 
            status: 'error'
          } 
        });
        return null;
      }
    },
    
    remove: async (url: string, config?: AxiosRequestConfig) => {
      try {
        set((store) => ({
          state: { ...store.state, isLoading: true, status: 'loading', isError: false, error: null }
        }));
        
        const response = await apiClient.delete<T>(url, config);
        const data = response.data;
        
        set({ state: { data, isLoading: false, isError: false, error: null, status: 'success' } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        set({ 
          state: { 
            data: null, 
            isLoading: false, 
            isError: true, 
            error: axiosError, 
            status: 'error'
          } 
        });
        return null;
      }
    },
  }));
};