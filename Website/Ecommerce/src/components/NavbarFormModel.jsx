import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { cartData } from "../store/Cart-data-store";
import axios from "axios";

const NavbarFormModel = ({ closeForm, setShowForm }) => {
  const VITE_BACKEND_URL ="https://adminpanel-mvc-backend.onrender.com";
 

  const { setAuthUser } = useContext(cartData);

  const [formType, setFormType] = useState("loginForm");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === "loginForm") {
      try {
        setIsLoggingIn(true);

        const res = await axios.post(
          `${VITE_BACKEND_URL}/ecommerce/login`,
          loginForm,
          {
            withCredentials: true,
          }
        );

        if (res.status >= 200 && res.status <= 300) {
          setAuthUser(res.data);
          toast.success("Login Successful", { autoClose:1000 , position:"top-center"});
          setLoginForm({ email: "", password: "" });
          setShowForm(false);
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Login failed", {
          autoClose: 3000,
        });
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      // Register user (add actual call if needed)
      try {
        toast.success("Registered Successfully", {
          autoClose: 2000,
        });
        setFormType("loginForm");
      } catch (error) {
        toast.error("Registration failed", { autoClose: 3000 });
      }
    }
  };

  return (
    <>
      {formType === "loginForm" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
          >
            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={closeForm}
              className="w-full text-sm font-bold text-gray-500 hover:underline cursor-pointer "
            >
              Close
            </button>

            {/* Link */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <span
                onClick={() => setFormType("signupForm")}
                className="text-blue-600 hover:underline cursor-pointer "
              >
                Create account
              </span>
            </p>
          </form>
        </div>
      )}

      {formType === "signupForm" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
          >
            {/* Name  */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="javed ahmad"
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={closeForm}
              className="w-full text-sm font-bold text-gray-500 hover:underline cursor-pointer "
            >
              Close
            </button>

            {/* Link */}
            <p className="text-center text-sm text-gray-500">
              have an account?{" "}
              <span
                onClick={() => setFormType("loginForm")}
                className="text-blue-600 hover:underline cursor-pointer "
              >
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default NavbarFormModel;
