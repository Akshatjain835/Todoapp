

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Correct Content-Type
          },
        }
      );

      console.log(data);
      toast.success(data.message || "USER registered successfully");
      //navigate to login page
      navigateTo("/login");


      // Store JWT in local storage after successful signup
      localStorage.setItem("jwt", data.token);

      // Clear form fields after successful signup
      setUsername("");
      setEmail("");
      setPassword("");

      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.errors || "An error occurred during signup.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">Signup</h2>
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required // Added validation
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Added validation
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Added validation
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
          >
            Signup
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
