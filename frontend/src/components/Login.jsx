

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
// import jwt from ""

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/login",
        {
        
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
       // Set JWT in local storage for future authenticated requests i.e checking whether the user is authenticated or not meanig correct user ne hi login kiya hain na 
       const token = data.token;  
       

       localStorage.setItem("jwt",token);
      //  console.log(localStorage.getItem("jwt"));
      toast.success(data.message || "USER Logged in  successfully");
      navigateTo("/");

     

      // Clear form fields after successful Login
      setEmail("");
      setPassword("");

      //navigate to Home  page
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.errors || "An error occurred during Login.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
        <form onSubmit={handleLogin}>
         

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
            Login
          </button>

          <p className="mt-4 text-center text-gray-600">
            NewUser?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
