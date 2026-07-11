import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
const [title, setTitle] = useState("")

const submitHandler = (e)=>{
    e.preventDefault()
     if (!title.trim()) return;

  onAddTask(title);

  setTitle("");
}

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Add New Task
      </h2>

      <form className="flex flex-col md:flex-row gap-4 " 
      onSubmit={submitHandler}>
        <input
        value={title}
          type="text"
          placeholder="Enter your task..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e)=>{
            setTitle(e.target.value)
            
          }}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;