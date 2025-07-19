import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Apple from "../assets/Apple.svg";
import Facebook from "../assets/Facebook.svg";
import Google from "../assets/Google.svg";
import { X } from "lucide-react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (type === "checkbox") setRememberMe(checked);
  };

 const handleLogin = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email || !formData.password) {
    setError("Please enter both email and password.");
    return;
  }

  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }

  setError("");
  setLoading(true);

try {
  await signInWithEmailAndPassword(auth, formData.email, formData.password);
  navigate("/dashboard");
} catch (err) {
  let message;

  switch (err.code) {
    case "auth/user-not-found":
      message = "No account found with this email.";
      break;
    case "auth/wrong-password":
      message = "Incorrect password.";
      break;
    case "auth/invalid-email":
      message = "Invalid email format.";
      break;
    case "auth/user-disabled":
      message = "This account has been disabled.";
      break;
    default:
      message = "Login failed. Please check your credentials.";
  }

  setError(message);
}


  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* MOBILE */}
      <div className="block lg:hidden relative bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className="pb-2 text-gray-400 hover:text-gray-600"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button className="pb-2 border-b-2 border-[#F377AB] font-semibold">
            Log in
          </button>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <button className="bg-gray-100 p-4 rounded-full hover:shadow-md">
            <img src={Apple} alt="Apple" className="w-8 h-8" />
          </button>
          <button className="bg-gray-100 p-4 rounded-full hover:shadow-md">
            <img src={Facebook} alt="Facebook" className="w-8 h-8" />
          </button>
          <button className="bg-gray-100 p-4 rounded-full hover:shadow-md">
            <img src={Google} alt="Google" className="w-8 h-8" />
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mb-8">
          or login with email
        </p>

        <div className="space-y-4 mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full border-2 rounded-lg p-3 focus:outline-none focus:border-[#5932EA]"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border-2 rounded-lg p-3 focus:outline-none focus:border-[#5932EA]"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center mb-6 mt-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleChange}
            className="mr-2 accent-pink-400"
          />
          <label className="text-sm text-gray-600">Remember me</label>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#5932EA]/90 transition"
        >
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block relative bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center space-x-6 mb-6 mr-[15rem]">
          <button
            className="pb-2 text-gray-400 hover:text-gray-600"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button className="pb-2 border-b-2 border-[#F377AB] font-semibold">
            Log in
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-[2rem] mr-[12rem]">
          <button className="bg-gray-100 p-3 rounded-4xl hover:shadow-md">
            <img src={Apple} alt="Apple" className="w-25 h-6" />
          </button>
          <button className="bg-gray-100 p-3 rounded-full hover:shadow-md">
            <img src={Facebook} alt="Facebook" className="w-25 h-8" />
          </button>
          <button className="bg-gray-100 p-3 rounded-full hover:shadow-md">
            <img src={Google} alt="Google" className="w-25 h-10" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-[2rem] mr-[13.6rem]">
          or login with email
        </p>

        <div className="space-y-4 mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full border-2 rounded-lg p-3 focus:outline-none focus:border-[#5932EA]"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border-2 rounded-lg p-3 focus:outline-none focus:border-[#5932EA]"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center mb-6 mt-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleChange}
            className="mr-2 accent-pink-400"
          />
          <label className="text-sm text-gray-600">Remember me</label>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#8475b8] transition"
        >
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
