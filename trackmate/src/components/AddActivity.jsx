import { useState } from "react";

export default function AddActivityForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueAt: "",
    reminderAt: "",
    priority: "Medium",
    category: "Personal"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add Activity
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Due and Reminder */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">Due At:</label>
            <input
              type="datetime-local"
              name="dueAt"
              value={form.dueAt}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">Reminder At:</label>
            <input
              type="datetime-local"
              name="reminderAt"
              value={form.reminderAt}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Priority & Category */}
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-600 font-medium">Priority:</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-600 font-medium">Category:</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
