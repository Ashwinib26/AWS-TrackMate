import { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard.jsx";
import AddActivityForm from "../components/AddActivity.jsx";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Set base URL for axios
  axios.defaults.baseURL = "http://localhost:5000";

  // Fetch activities from backend on mount
  useEffect(() => {
    axios
      .get("/activities")
      .then((res) => setActivities(res.data))
      .catch((err) => {
        console.error("Error fetching activities:", err);
        setError("Failed to fetch activities.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Add new activity
  const addActivity = async (activity) => {
    try {
      const res = await axios.post("/activities", activity);
      setActivities([...activities, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error("Error adding activity:", err);
      alert("Failed to add activity.");
    }
  };

  // Mark activity as completed (optimistic UI update)
  const completeActivity = async (id) => {
    setActivities(
      activities.map((a) => (a._id === id ? { ...a, status: "Completed" } : a))
    );
    try {
      await axios.patch(`/activities/${id}`, { status: "Completed" });
    } catch (err) {
      console.error("Error completing activity:", err);
      alert("Failed to update activity status.");
    }
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

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Activities Grid */}
        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading activities...</p>
        ) : activities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard
                key={activity._id}
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
