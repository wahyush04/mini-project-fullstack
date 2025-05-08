// // src/hooks/useUsers.ts
// import { useCallback, useEffect, useState } from 'react';
// import { UserModel } from '../types/user';
// import { useUsersStore, UserService } from '../services/use';
// import { PaginatedResponse } from '../types/api';
// import { useApiError } from './useApi';

// export const useUsers = (initialPage = 1, initialLimit = 10) => {
//   const [page, setPage] = useState(initialPage);
//   const [limit, setLimit] = useState(initialLimit);
  
//   // Get store state
//   const { state, reset } = useUsersStore();
//   const { data, isLoading, isError, error, status } = state;
  
//   // Extract users and pagination data from store response
//   const users = data?.items || [];
//   const pagination = data ? {
//     total: data.total,
//     totalPages: data.totalPages,
//     currentPage: data.page,
//     limit: data.limit
//   } : null;
  
//   // Handle errors with custom hook
//   const { getErrorMessage } = useApiError(error);
  
//   // Fetch users with current pagination
//   const fetchUsers = useCallback(async () => {
//     await UserService.getUsers(page, limit);
//   }, [page, limit]);
  
//   // Load users on mount and when pagination changes
//   useEffect(() => {
//     fetchUsers();
    
//     // Cleanup on unmount
//     return () => reset();
//   }, [fetchUsers, reset]);
  
//   // Page navigation
//   const goToPage = useCallback((newPage: number) => {
//     setPage(newPage);
//   }, []);
  
//   const nextPage = useCallback(() => {
//     if (pagination && page < pagination.totalPages) {
//       setPage(page + 1);
//     }
//   }, [page, pagination]);
  
//   const prevPage = useCallback(() => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   }, [page]);
  
//   // Change items per page
//   const changeLimit = useCallback((newLimit: number) => {
//     setLimit(newLimit);
//     setPage(1); // Reset to first page when changing limit
//   }, []);
  
//   return {
//     users,
//     pagination,
//     isLoading,
//     isError,
//     error,
//     errorMessage: getErrorMessage(),
//     status,
//     fetchUsers,
//     goToPage,
//     nextPage,
//     prevPage,
//     changeLimit,
//     reset
//   };
// };