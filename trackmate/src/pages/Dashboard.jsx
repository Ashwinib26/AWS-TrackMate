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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Activities</h1>
      <button 
        onClick={() => setShowForm(true)} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Activity
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onComplete={completeActivity} 
          />
        ))}
      </div>

      {showForm && <AddActivityForm onAdd={addActivity} onClose={() => setShowForm(false)} />}
    </div>
  );
}
