import { useState } from "react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Both fields are required!");
      return;
    }

    setError("");
    onLogin(form.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
          TrackMate
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Sign in to track your activities
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg text-gray-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg text-gray-700"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Extra options */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
