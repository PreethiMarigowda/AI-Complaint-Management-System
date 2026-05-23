import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {

      setMessage("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        "https://ai-complaint-backend-78ty.onrender.com/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);

      setMessage(
        "Registration Successful! Redirecting to Login..."
      );

      // CLEAR FORM
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // REDIRECT TO LOGIN
      setTimeout(() => {

        window.location.href = "/login";

      }, 2000);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-gray-900 w-full max-w-md p-10 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Register to continue
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="bg-blue-500 text-white p-3 rounded-lg mb-6 text-center">
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2 text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-xl text-lg font-semibold text-white"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;