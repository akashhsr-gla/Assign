import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const FilterModal = ({ isOpen, onClose, onApplyFilter }) => {
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleApply = () => {
    onApplyFilter({ sortBy, sortOrder });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 w-80 relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Filter Users</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sort Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
