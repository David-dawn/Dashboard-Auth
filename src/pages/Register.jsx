import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import Apple from "../assets/Apple.svg";
import Facebook from "../assets/Facebook.svg";
import Google from "../assets/Google.svg";
import SuccessImage from "../assets/SuccessImage.png";
import { X } from "lucide-react";
import {
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    birthday: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    manualAddress: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleCreateAccount = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email || !formData.password) {
    setError("Please fill in your email and password.");
    return;
  }

  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  setError("");
  setStep(2);
};


const handleNext = () => {
  const phoneRegex = /^[0-9]{7,15}$/;

  if (!formData.fullName || !formData.gender || !formData.phone) {
    setError("Please complete all required fields.");
    return;
  }

  if (!phoneRegex.test(formData.phone)) {
    setError("Please enter a valid phone number.");
    return;
  }

  if (formData.birthday) {
    const enteredDate = new Date(formData.birthday);
    const today = new Date();

    if (enteredDate > today) {
      setError("Birthday cannot be a future date.");
      return;
    }
  }

  setError("");
  setStep(3);
};



const handleRegister = async () => {
  const zipRegex = /^[0-9]{4,10}$/;

  if (
    !formData.street ||
    !formData.city ||
    !formData.state ||
    !formData.zip
  ) {
    setError("Please complete your address.");
    return;
  }

  if (!zipRegex.test(formData.zip)) {
    setError("Please enter a valid ZIP code (4–10 digits).");
    return;
  }

  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await updateProfile(userCredential.user, {
      displayName: formData.fullName,
    });

    setStep(4);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* MOBILE VERSION */}
      <div className="block lg:hidden relative bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {step === 1 && (
          <>
            <div className="flex justify-center space-x-6 mb-6">
              <button className="pb-2 border-b-2 border-[#F377AB] font-semibold">
                Register
              </button>
              <button
                className="pb-2 text-gray-400 hover:text-gray-600"
                onClick={() => navigate("/login")}
              >
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
              or register with email
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
              <p className="text-xs text-gray-400">8+ characters</p>
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-600">
                Send me news and promotions
              </label>
            </div>

            <button
              onClick={handleCreateAccount}
              className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#5932EA] transition"
            >
              Create account
            </button>

            <p className="text-xs text-center text-gray-400 mt-6">
              By continuing I agree with the{" "}
              <a href="#" className="text-purple-600 underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 underline">
                Privacy Policy
              </a>
            </p>
          </>
        )}

        {step === 2 && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-6 flex justify-between">
              <span>Personal information</span>
              <span className="text-green-600 font-medium text-sm mr-[4.5rem]">
                2 of 3
              </span>
            </h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5932EA]"
              value={formData.fullName}
              onChange={handleChange}
            />

            <div className="mb-4">
              <label className="text-sm font-medium block mb-2">Gender:</label>
              <div className="flex items-center gap-6">
                {["Male", "Female"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-[#5932EA]"
                    />
                    <span
                      className={`text-sm ${
                        formData.gender === g ? "text-[#5932EA]" : ""
                      }`}
                    >
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <span>ⓘ</span>
              <span>The phone number and birthday are only visible to you</span>
            </div>

            <div className="flex gap-2 mb-4">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-[30%] focus:outline-none focus:border-[#5932EA]"
              >
                <option value="+598">+598</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+234">+234</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#5932EA]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="relative mb-6">
              <input
                type="date"
                name="birthday"
                id="birthday"
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5932EA] 
               [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                value={formData.birthday}
                onChange={handleChange}
              />
              <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                Optional
              </span>
              <CalendarIcon
                className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() =>
                  document.getElementById("birthday").showPicker?.()
                }
              />
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Let us know about your birthday so as not to miss a gift
            </p>

            <button
              onClick={handleNext}
              className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#5932EA] transition"
            >
              Save information
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-6 flex justify-between">
              <span>Add address</span>
              <span className="text-green-600 font-medium text-sm mr-[7.9rem]">
                3 of 3
              </span>
            </h2>

            {!formData.manualAddress ? (
              <>
                {/* Search Field (visual only) */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search for address"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5932EA]"
                    disabled
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Your address is not visible to other users
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-[2rem]">
                  <button
                    className="flex-1 py-2 px-4 border border-[#5932EA] text-[#5932EA] text-sm rounded-full hover:bg-[#f3f0ff] transition"
                    onClick={() => alert("Use current location clicked")}
                  >
                    📍 Use current location
                  </button>
                  <button
                    className="flex-1 py-2 px-4 border border-[#5932EA] text-[#5932EA] text-sm rounded-full hover:bg-[#f3f0ff] transition"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, manualAddress: true }))
                    }
                  >
                    📝 Add manually
                  </button>
                </div>

                {/* Info Icons */}
                <div className="mt-[8rem] space-y-2">
                  <p className="text-sm text-gray-800 font-semibold">
                    Sharing your address shows:
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>👥</span>
                    <span>People near you</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⏱️</span>
                    <span>Estimated delivery time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💰</span>
                    <span>Estimate shipping costs</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Manual Address Fields */}
                <div className="space-y-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street address"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.street}
                    onChange={handleChange}
                  />

                  <div className="relative">
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.apartment}
                      onChange={handleChange}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      Optional
                    </span>
                  </div>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="Zip code"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full mt-6 bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#5932EA]/90 transition"
                >
                  {loading ? "Saving..." : "Save information"}
                </button>
              </>
            )}

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          </div>
        )}

         {step === 4 && (
          <div className="w-full text-center overflow-hidden rounded-2xl">
            <div className="bg-[#ffe6f0] p-8 flex justify-center">
              <img src={SuccessImage} alt="Success" className="w-40 h-auto" />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#2E2C34] mb-6">
                You are successfully registered!
              </h2>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#8475b8] transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:block relative bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* X Close */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {step === 1 && (
          <>
            <div className="flex justify-center space-x-6 mb-6 mr-[15rem]">
              <button className="pb-2 border-b-2 border-[#F377AB] font-semibold">
                Register
              </button>
              <button
                className="pb-2 text-gray-400 hover:text-gray-600"
                onClick={() => navigate("/login")}
              >
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
              or register with email
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
              <p className="text-xs text-gray-400">8+ characters</p>
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-600">
                Send me news and promotions
              </label>
            </div>

            <button
              onClick={handleCreateAccount}
              className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#8475b8] transition"
            >
              Create account
            </button>

            <p className="text-xs text-center text-gray-400 mt-6">
              By continuing I agree with the{" "}
              <a href="#" className="text-purple-600 underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 underline">
                Privacy Policy
              </a>
            </p>
          </>
        )}

        {/* reuse your step 2 and step 3 here if you want, or keep mobile-only */}

        {step === 2 && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-6 flex justify-between">
              <span>Personal information</span>
              <span className="text-green-600 font-medium text-sm mr-[10rem]">
                2 of 3
              </span>
            </h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5932EA]"
              value={formData.fullName}
              onChange={handleChange}
            />

            <div className="mb-4">
              <label className="text-sm font-medium block mb-2">Gender:</label>
              <div className="flex items-center gap-6">
                {["Male", "Female"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-[#5932EA]"
                    />
                    <span
                      className={`text-sm ${
                        formData.gender === g ? "text-[#5932EA]" : ""
                      }`}
                    >
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <span>ⓘ</span>
              <span>The phone number and birthday are only visible to you</span>
            </div>

            <div className="flex gap-2 mb-4">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-[30%] focus:outline-none focus:border-[#5932EA]"
              >
                <option value="+598">+598</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+234">+234</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#5932EA]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="relative mb-6">
              <input
                type="date"
                name="birthday"
                id="birthday"
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5932EA] 
               [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                value={formData.birthday}
                onChange={handleChange}
              />
              <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                Optional
              </span>
              <CalendarIcon
                className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() =>
                  document.getElementById("birthday").showPicker?.()
                }
              />
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Let us know about your birthday so as not to miss a gift
            </p>

            <button
              onClick={handleNext}
              className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#5932EA] transition"
            >
              Save information
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-6 flex justify-between">
              <span>Add address</span>
              <span className="text-green-600 font-medium text-sm mr-[13.6rem]">
                3 of 3
              </span>
            </h2>

            {!formData.manualAddress ? (
              <>
                {/* Search Field (visual only) */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search for address"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5932EA]"
                    disabled
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Your address is not visible to other users
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-[2rem]">
                  <button
                    className="flex-1 py-2 px-4 border border-[#5932EA] text-[#5932EA] text-sm rounded-full hover:bg-[#f3f0ff] transition"
                    onClick={() => alert("Use current location clicked")}
                  >
                    📍 Use current location
                  </button>
                  <button
                    className="flex-1 py-2 px-4 border border-[#5932EA] text-[#5932EA] text-sm rounded-full hover:bg-[#f3f0ff] transition"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, manualAddress: true }))
                    }
                  >
                    📝 Add manually
                  </button>
                </div>

                {/* Info Icons */}
                <div className="mt-[10rem] space-y-2">
                  <p className="text-sm text-gray-800 font-semibold">
                    Sharing your address shows:
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>👥</span>
                    <span>People near you</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⏱️</span>
                    <span>Estimated delivery time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💰</span>
                    <span>Estimate shipping costs</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Manual Address Fields */}
                <div className="space-y-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street address"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />

                  <div className="relative">
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.apartment}
                      onChange={handleChange}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      Optional
                    </span>
                  </div>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="Zip code"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full mt-6 bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#5932EA]/90 transition"
                >
                  {loading ? "Saving..." : "Save information"}
                </button>
              </>
            )}

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          </div>
        )}
        {step === 4 && (
          <div className="w-full text-center overflow-hidden rounded-2xl">
            <div className="bg-[#ffe6f0] p-8 flex justify-center">
              <img src={SuccessImage} alt="Success" className="w-40 h-auto" />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#2E2C34] mb-6">
                You are successfully registered!
              </h2>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-[#5932EA] text-white py-3 rounded-xl hover:bg-[#8475b8] transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
