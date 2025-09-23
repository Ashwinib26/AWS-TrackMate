import { useState } from "react";

export default function AddActivityForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueAt: "",
    reminderAt: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Activity</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 rounded"/>
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded"/>
          <label>Due At:</label>
          <input type="datetime-local" name="dueAt" value={form.dueAt} onChange={handleChange} className="border p-2 rounded"/>
          <label>Reminder At:</label>
          <input type="datetime-local" name="reminderAt" value={form.reminderAt} onChange={handleChange} className="border p-2 rounded"/>
          
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
