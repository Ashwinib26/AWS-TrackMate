export default function ActivityCard({ activity, onComplete }) {
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
      default:
        return "bg-red-100 text-red-700";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-orange-400 text-white";
      case "Low":
      default:
        return "bg-green-400 text-white";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">{activity.title}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-2">{activity.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className={`px-2 py-1 text-sm rounded-full font-medium ${getStatusColor(activity.status)}`}>
          {activity.status}
        </span>
        <span className={`px-2 py-1 text-sm rounded-full font-medium ${getPriorityColor(activity.priority)}`}>
          {activity.priority} Priority
        </span>
        {activity.category && (
          <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
            {activity.category}
          </span>
        )}
      </div>

      {/* Dates */}
      <div className="mt-3 text-gray-500 text-sm space-y-1">
        <p><b>Due:</b> {new Date(activity.dueAt).toLocaleString()}</p>
        <p><b>Reminder:</b> {new Date(activity.reminderAt).toLocaleString()}</p>
      </div>

      {/* Complete button */}
      {activity.status !== "Completed" && (
        <button
          onClick={() => onComplete(activity.id)}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition font-medium"
        >
          Mark Complete
        </button>
      )}
    </div>
  );
}
