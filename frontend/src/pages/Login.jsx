import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://ai-complaint-backend-78ty.onrender.com/api/users/login",
        formData
      );

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Login Successful");

      // REDIRECT
      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="bg-gray-900 w-full max-w-xl rounded-3xl p-12 shadow-2xl">

        <h1 className="text-6xl font-bold text-white text-center mb-4">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center text-2xl mb-10">
          Login to continue
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="bg-blue-500 text-white text-center py-4 rounded-xl mb-8 text-xl">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          <div>

            <label className="block text-white text-2xl mb-3">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-6 py-5 rounded-2xl outline-none border border-gray-700 text-xl"
              required
            />

          </div>

          <div>

            <label className="block text-white text-2xl mb-3">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-6 py-5 rounded-2xl outline-none border border-gray-700 text-xl"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-5 rounded-2xl text-3xl font-semibold"
          >
            Login
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-gray-400 text-center mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;