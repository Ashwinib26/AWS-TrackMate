import { useState } from "react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
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

    // For now just simulate login success
    setError("");
    onLogin(form.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
