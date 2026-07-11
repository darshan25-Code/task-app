import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/Taskcard";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

import API from "../api/axios";

const Dashboard = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
  const testAPI = async () => {
    try {
      const res = await API.get("/tasks");

         setTasks(res.data.tasks);

    } catch (error) {
      console.log(error.response.data);
    }
  };

  testAPI();

}, []);

  const addTask = async (title) => {
  try {
    await API.post("/tasks", {
      title,
    });

    const res = await API.get("/tasks");

    setTasks(res.data.tasks);
   toast.success("Task Added Successfully");
  } catch (error) {
    console.log(error);
  }
};

  const deleteTask = async (id) => {
  console.log("Delete Clicked:", id);

  try {
    await API.delete(`/tasks/${id}`);

    const res = await API.get("/tasks");
    setTasks(res.data.tasks);
toast.success("Task Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

 const completeTask = async (id) => {
  try {
    await API.put(`/tasks/${id}`, {
      status: "Completed",
    });

    const res = await API.get("/tasks");
    setTasks(res.data.tasks);
toast.success("Task Completed");
  } catch (error) {
    console.log(error);
  }
};

 const editTask = async (id, newTitle) => {
  try {
    await API.put(`/tasks/${id}`, {
      title: newTitle,
    });

    const res = await API.get("/tasks");
    setTasks(res.data.tasks);
toast.success("Task Updated Successfully");
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your daily tasks efficiently.
             </p>
        </div>

        {/* Task Form */}
        <TaskForm onAddTask={addTask} />

        {/* Task List */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            My Tasks
          </h2>

         <div className="flex flex-col gap-3">
  {tasks.length > 0 ? (
    tasks.map((elem) => (
      <TaskCard
        key={elem._id}
        id={elem._id}
        title={elem.title}
        status={elem.status}
        onDelete={deleteTask}
        onComplete={completeTask}
        onEdit={editTask}
      />
    ))
  ) : (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <h3 className="text-2xl font-semibold text-gray-700">
        📝 No Tasks Yet
      </h3>

      <p className="text-gray-500 mt-2">
        Add your first task to get started!
      </p>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;