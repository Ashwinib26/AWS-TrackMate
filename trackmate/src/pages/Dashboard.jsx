import { useState } from "react";
import { mockActivities } from "../data/MockActivities.jsx";
import ActivityCard from "../components/ActivityCard.jsx";
import AddActivityForm from "../components/AddActivity.jsx";

export default function Dashboard() {
  const [activities, setActivities] = useState(mockActivities);
  const [showForm, setShowForm] = useState(false);

  const addActivity = (activity) => {
    setActivities([...activities, { ...activity, id: Date.now() }]);
    setShowForm(false);
  };

  const completeActivity = (id) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, status: "completed" } : a
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📌 My Activities</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ➕ Add Activity
          </button>
        </div>

        {/* Activities Grid */}
        {activities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onComplete={completeActivity}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No activities yet. Add one to get started 🚀
          </p>
        )}

        {/* Add Activity Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <AddActivityForm
                onAdd={addActivity}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
