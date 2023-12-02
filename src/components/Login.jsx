import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://stg.dhunjam.in/account/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        navigate({
          pathname: "/dashboard",
        });
        localStorage.setItem("userId", data?.data?.id);
      } else {
        console.error("Login failed:", data);
        setError(
          data.ui_err_msg || "Failed to login, Check Username and password"
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dhunjam-dark text-white">
      <form
        className="bg-dhunjam-dark shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-[600px] max-w-lg text-[16px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-dhunjam-white font-poppins font-bold text-[32px] mb-6 text-center">
          Venue Admin Login
        </h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-dhunjam-white rounded-lg w-full py-2 px-3 text-dhunjam-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <input
            className="shadow appearance-none border border-dhunjam-white rounded-lg  w-full py-2 px-3 text-dhunjam-white leading-tight focus:outline-none focus:shadow-outline bg-transparent pr-10"
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <span className="text-white">
              <VisibilityIcon />
            </span>
          </span>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex items-center justify-center">
          <button
            className={`bg-dhunjam-purple text-dhunjam-white font-bold py-2 px-4 rounded-lg  w-[600px]  hover:  border-[#F0C3F1]
                  `}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/register" className="text-dhunjam-white text-sm">
            New Registration?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
