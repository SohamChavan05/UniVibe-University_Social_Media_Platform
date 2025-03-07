import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    enrollment: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/lr/register",
        formData
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form className="space-y-5">
          <input
            type="text"
            name="enrollment"
            placeholder="Enrollment ID"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(24,119,242,1)] focus:outline-none"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(24,119,242,1)] focus:outline-none"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(24,119,242,1)] focus:outline-none"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-[rgba(24,119,242,1)] hover:bg-[rgba(20,105,220,1)] text-white font-semibold p-3 rounded-lg transition-all"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          <a href="/login" className="text-[rgba(24,119,242,1)] hover:underline">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({
    enrollment: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/lr/login",
        formData
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.details.token);
      localStorage.setItem("userId", formData["enrollment"]);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-5">
          <input
            type="text"
            name="enrollment"
            placeholder="Enrollment ID"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(24,119,242,1)] focus:outline-none"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(24,119,242,1)] focus:outline-none"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-[rgba(24,119,242,1)] hover:bg-[rgba(20,105,220,1)] text-white font-semibold p-3 rounded-lg transition-all"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/register" className="text-[rgba(24,119,242,1)] hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export { Register, Login };
