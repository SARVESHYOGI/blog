import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import loginValidator from "../validators/loginValidator";
import { useNavigate, Link } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
};

const initialFormError = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        // api request
        const response = await axios.post("/auth/signin", formData);
        const data = response.data;

        window.localStorage.setItem("blogData", JSON.stringify(data.data));

        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    }
  };

  return (
    <div className="form-container text-white bg-blue-500" >
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title " >Login Form</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="email@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <p className="error">{formError.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
        </div>

        <Link className="forgot-password" to="/forgot-password">
          Forgot Password
        </Link>

        <div className="form-group">
          <input
            className="bg-blue-700 text-white p-2 rounded-xl border border-blue-950 cursor-pointer 
             hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none 
             transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            type="submit"
            value={`${loading ? "Logging..." : "Login"}`}
          />

        </div>
      </form>
    </div>
  );
};

export default Login;
