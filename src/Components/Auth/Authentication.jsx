import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Authentication = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');


 
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      
      
      localStorage.setItem('token', response.data.token);
      navigate('/users');


    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              type="email"

                 id="email"
              value={email}
                  onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                type={showPassword ? 'text' : 'password'}
                id="password"

                value={password}
                  onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"

                required
              />
                  <button
                type="button"
                     className="absolute   right-3 top-1/2   transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                 </button>
            </div>
          </div>
          <button
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
           
            type="submit"
          >
            Login
          </button>


        </form>


      </div>
      
    </div>
  );
};

export default Authentication;
