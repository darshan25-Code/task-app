import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";


const Navbar = () => {

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await API.post("/auth/logout");

     toast.success("Logged Out Successfully");

    navigate("/");
   
  } catch (error) {
    console.log(error);
  }
};

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
       
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          Task Manager
        </Link>

        
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>

          <button
  onClick={handleLogout}
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
>
  Logout
</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;