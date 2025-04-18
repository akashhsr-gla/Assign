import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import UserCard from './UserCard';
import EditModal from '../Modal/editModal';
import FilterModal from '../Modal/filterModal';
import { fetchUsers, updateUser, deleteUser, searchUsers, filterUsers } from '../../../utils/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({ sortBy: '', sortOrder: 'asc' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(currentPage);
        setUsers(data.data);
        setFilteredUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
        showMessage('Error loading users', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, navigate]);

  // Apply search and filter whenever users, searchTerm, or filterOptions change
  useEffect(() => {
    let result = [...users];
    
    // Apply search
    result = searchUsers(result, searchTerm);
    
    // Apply filters
    result = filterUsers(result, filterOptions);
    
    setFilteredUsers(result);
  }, [users, searchTerm, filterOptions]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (formData) => {
    try {
      await updateUser(selectedUser.id, formData);
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData }
          : user
      ));
      setIsEditModalOpen(false);
      showMessage('User updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      showMessage('Error updating user', 'error');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        showMessage('User deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting user:', error);
        showMessage('Error deleting user', 'error');
      }
    }
  };

  const handleApplyFilter = (options) => {
    setFilterOptions(options);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Users</h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              <FaFilter />
              Filter
            </button>
          </div>
        </div>
        
        {/* Message display */}
        {message.text && (
          <div
            className={`mb-4 p-4 rounded text-center ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Grid of user cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};

export default UserList;
