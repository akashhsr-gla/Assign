import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

export const fetchUsers = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/users?page=${page}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/users/${userId}`);
  return response.data;
};

// Since the API doesn't support search and filter, we'll implement client-side functionality
export const searchUsers = (users, searchTerm) => {
  if (!searchTerm) return users;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return users.filter(user => 
    user.first_name.toLowerCase().includes(lowerSearchTerm) ||
    user.last_name.toLowerCase().includes(lowerSearchTerm) ||
    user.email.toLowerCase().includes(lowerSearchTerm)
  );
};

export const filterUsers = (users, { sortBy, sortOrder }) => {
  if (!sortBy) return users;

  return [...users].sort((a, b) => {
    const aValue = sortBy === 'firstName' ? a.first_name : a.last_name;
    const bValue = sortBy === 'firstName' ? b.first_name : b.last_name;
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
};
