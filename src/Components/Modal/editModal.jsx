import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditModal = ({ user, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    
    last_name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,

        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">


        <button
          onClick={onClose}
          className="absolute   top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        


        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
        
        <form onSubmit={handleSubmit}>
              <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                 First Name
            </label>
            <input
                 type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          
            <div className="mb-6">
             <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
              </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          
          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Save Changes

            </button>
          </div>

        </form>

      </div>


    </div>
  );
};

export default EditModal;
