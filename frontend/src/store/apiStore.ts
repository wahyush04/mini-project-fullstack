import { create } from 'zustand';
import { fetchDataFromApi } from '../utils/apiUtils';

// Define the store interface
interface ApiStore {
  data: any;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

// Create the Zustand store to manage the API state
const useApiStore = create<ApiStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  // Function to fetch data from the API
  fetchData: async () => {
    set({ loading: true, error: null }); // Set loading state to true and reset any error

    try {
      const data = await fetchDataFromApi();
      set({ data, loading: false }); // Set data and loading to false on success
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      });
    }
  },
}));

export default useApiStore;
