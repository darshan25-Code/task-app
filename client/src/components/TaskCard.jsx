import { useState } from "react";


const TaskCard = ({ title, status, id, onDelete, onComplete, onEdit }) => {

  const [isEditing, setIsEditing] = useState(false);
const [editedTitle, setEditedTitle] = useState(title);
const handleSave = () => {
  if (!editedTitle.trim()) return;

  onEdit(id, editedTitle);

  setIsEditing(false);
};
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
      {/* Left Side */}
      <div>
        {isEditing ? (
  <input
    type="text"
    value={editedTitle}
    onChange={(e) => setEditedTitle(e.target.value)}
    className="border border-gray-300 rounded-lg px-3 py-2"
  />
) : (
  <h3 className="text-lg font-semibold text-gray-800">
    {title}
  </h3>
)}

        <span
  className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {status}
</span>
      </div>

      {/* Right Side */}
      <div
        className="flex gap-3">
        <button onClick={() => onComplete(id)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
          Complete
        </button>

        <button onClick={() => onDelete(id)}

          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
          Delete
        </button>
       {isEditing ? (
  <button
    onClick={handleSave}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
  >
    Save
  </button>
) : (
  <button
    onClick={() => setIsEditing(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
  >
    Edit
  </button>
)}

      </div>

    </div>
  );
};

export default TaskCard;