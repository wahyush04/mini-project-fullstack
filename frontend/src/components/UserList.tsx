// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useUser } from '../hooks/useUser';

// const UserList: React.FC = () => {
//   const {
//     isLoading,
//     isError,
//     errorMessage,

//   } = useUser();

//   // Show loading state
//   if (isLoading && !useUser.length) {
//     return <div className="loading">Loading users...</div>;
//   }

//   // Show error state
//   if (isError) {
//     return (
//       <div className="error">
//         <h3>Error loading users</h3>
//         <p>{errorMessage}</p>
//         <button onClick={() => fetchUsers()}>Try Again</button>
//       </div>
//     );
//   }

//   return (
//     <div className="user-list">
//       <h2>Users</h2>
      
//       {/* User table */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {us.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <Link to={`/users/${user.id}`}>View</Link>
//                 <Link to={`/users/${user.id}/edit`}>Edit</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       {/* Empty state */}
//       {!isLoading && users.length === 0 && (
//         <div className="empty-state">
//           <p>No users found</p>
//         </div>
//       )}
      
//       {/* Pagination controls */}
//       {pagination && (
//         <div className="pagination">
//           <button 
//             onClick={() => prevPage()} 
//             disabled={pagination.currentPage <= 1}
//           >
//             Previous
//           </button>
          
//           {/* Page numbers */}
//           <div className="pages">
//             {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
//               .filter(page => {
//                 // Show current page, first, last, and pages around current
//                 const current = pagination.currentPage;
//                 return (
//                   page === 1 || 
//                   page === pagination.totalPages || 
//                   (page >= current - 2 && page <= current + 2)
//                 );
//               })
//               .map((page, index, filteredPages) => (
//                 <React.Fragment key={page}>
//                   {/* Add ellipsis if pages are skipped */}
//                   {index > 0 && filteredPages[index - 1] !== page - 1 && (
//                     <span className="ellipsis">...</span>
//                   )}
//                   <button 
//                     className={pagination.currentPage === page ? 'active' : ''}
//                     onClick={() => goToPage(page)}
//                   >
//                     {page}
//                   </button>
//                 </React.Fragment>
//               ))}
//           </div>
          
//           <button 
//             onClick={() => nextPage()} 
//             disabled={pagination.currentPage >= pagination.totalPages}
//           >
//             Next
//           </button>
          
//           {/* Items per page selector */}
//           <select 
//             value={pagination.limit} 
//             onChange={(e) => changeLimit(Number(e.target.value))}
//           >
//             <option value="5">5 per page</option>
//             <option value="10">10 per page</option>
//             <option value="25">25 per page</option>
//             <option value="50">50 per page</option>
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;