import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-blue-900 text-red-50 w-full h-[4rem] flex justify-center items-center">
      <NavLink to="/login"
        className={({ isActive }) =>
          isActive ? "bg-blue-700 text-white px-2 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-2 mx-2 py-1 rounded-3xl border border-blue-950 "
        }
      >Login</NavLink>

      <NavLink to="/signup"
        className={({ isActive }) =>
          isActive ? "bg-blue-700 text-white px-2 py-1 mx-2 rounded-3xl border border-blue-950 " : "px-2 mx-2 py-1 rounded-3xl border border-blue-950 "
        }
      >Signup</NavLink>
    </nav>
  );
};

export default PublicNavbar;
