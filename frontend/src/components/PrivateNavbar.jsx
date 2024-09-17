import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("blogData");
    toast.success("Logout successfull", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true,
    });
    navigate("/login");
  };
  return (
    <nav className="bg-blue-900 text-red-50 w-full h-[4rem] flex justify-around items-center px-16">
      <NavLink to="/"
        className={({ isActive }) =>
          isActive ? "bg-blue-700 text-white px-12 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-12 mx-2 py-1 rounded-3xl border border-blue-950 "
        }>
        Home
      </NavLink>
      {(auth.role === 1 || auth.role === 2) && (
        <NavLink to="/categories"
          className={({ isActive }) =>
            isActive ? "bg-blue-700 text-white px-12 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-12 mx-2 py-1 rounded-3xl border border-blue-950 "
          }
        >Categories</NavLink>
      )}
      <NavLink to="/posts"
        className={({ isActive }) =>
          isActive ? "bg-blue-700 text-white px-12 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-12 mx-2 py-1 rounded-3xl border border-blue-950 "
        }
      >Posts</NavLink>
      <NavLink to="/profile"
        className={({ isActive }) =>
          isActive ? "bg-blue-700 text-white px-12 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-12 mx-2 py-1 rounded-3xl border border-blue-950 "
        }
      >Profile</NavLink>
      <NavLink to="/setting"
        className={({ isActive }) =>
          isActive ? "bg-blue-700 text-white px-12 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-12 mx-2 py-1 rounded-3xl border border-blue-950 "
        }
      >Setting</NavLink>
      <NavLink to="/login"
        className="bg-blue-950 text-white py-2 rounded-xl border border-blue-950 cursor-pointer 
      hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none 
      transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-12"
        type="submit"
        onClick={handleLogout}>
        Logout
      </NavLink>
    </nav>
  );
};

export default PrivateNavbar;
