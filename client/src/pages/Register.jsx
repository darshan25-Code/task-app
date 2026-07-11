import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,   

  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/register", formData);

    toast.success("Registration Successful 🎉");

    navigate("/");

  } catch (error) {
    console.log(error.response?.data || error.message);

    toast.error(error.response?.data?.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Task Manager
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create Your Account 🚀
        </p>

    <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">
              Full Name
            </label>
           <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your name"
  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
/>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Email
            </label>
            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
/>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Password
            </label>
            <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter your password"
  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
/>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;