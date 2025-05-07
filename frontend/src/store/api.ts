// src/store/api.ts
import { create } from 'zustand';

// Define the API response states
interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Define the API store interface
interface ApiStore<T> {
  // State
  apiState: ApiState<T>;
  
  // Actions
  startLoading: () => void;
  setData: (data: T) => void;
  setError: (error: Error) => void;
  reset: () => void;
  
  // Main fetch function
  fetchData: (url: string, options?: RequestInit) => Promise<void>;
}

// Function to create an API store for any data type
export const createApiStore = <T>() => {
  return create<ApiStore<T>>((set) => ({
    // Initial state
    apiState: {
      data: null,
      isLoading: false,
      error: null,
    },
    
    // Actions
    startLoading: () => set((state) => ({
      apiState: { ...state.apiState, isLoading: true }
    })),
    
    setData: (data: T) => set({
      apiState: { data, isLoading: false, error: null }
    }),
    
    setError: (error: Error) => set({
      apiState: { data: null, isLoading: false, error }
    }),
    
    reset: () => set({
      apiState: { data: null, isLoading: false, error: null }
    }),
    
    // Main fetch function
    fetchData: async (url: string, options?: RequestInit) => {
      set((state) => ({
        apiState: { ...state.apiState, isLoading: true, error: null }
      }));
      
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        set({ apiState: { data, isLoading: false, error: null } });
      } catch (error) {
        set({ 
          apiState: { 
            data: null, 
            isLoading: false, 
            error: error instanceof Error ? error : new Error(String(error)) 
          } 
        });
      }
    },
  }));
};

// Example of creating a typed API store:
// export const useUserStore = createApiStore<User>();