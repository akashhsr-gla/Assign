import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative">
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={() => onEdit(user)}

          className="text-gray-600 hover:text-black transition-colors"
          title="Edit user"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => onDelete(user.id)}

          className="text-gray-600 hover:text-red-600 transition-colors"
          title="Delete user"
        >
          <FaTrash size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center">


        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser className="text-gray-400 text-4xl" />
          )}

        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {user.first_name} {user.last_name}
        </h3>
        
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
