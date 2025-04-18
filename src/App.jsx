import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './Components/Auth/Authentication';
import UserList from './Components/UserList/UserList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
