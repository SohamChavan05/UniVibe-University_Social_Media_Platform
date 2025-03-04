import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    enrollment: '',
    name: '',
    password: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/lr/register', formData);
      alert(response.data.message);
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="enrollment" placeholder="Enrollment" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({
    enrollment: '',
    password: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/lr/login', formData);
      alert(response.data.message);
      localStorage.setItem('token', response.data.details.token);
      localStorage.setItem("userId",formData['enrollment'])
      navigate('/')
      
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="enrollment" placeholder="Enrollment" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export { Register, Login };
