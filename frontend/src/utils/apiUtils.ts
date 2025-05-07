import axios from 'axios';

// Function to fetch data from the API
export const fetchDataFromApi = async () => {
  const response = await axios.get('http://localhost:3000/users');
  return response.data;
};
