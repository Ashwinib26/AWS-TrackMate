export default function ActivityCard({ activity, onComplete }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold">{activity.title}</h2>
      <p>{activity.description}</p>
      <p><b>Due:</b> {activity.dueAt}</p>
      <p><b>Reminder:</b> {activity.reminderAt}</p>
      <p><b>Status:</b> {activity.status}</p>
      {activity.status !== "completed" && (
        <button 
          onClick={() => onComplete(activity.id)} 
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          Mark Complete
        </button>
      )}
    </div>
  );
}
