import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { 
  Heart, Mail, Lock, Loader, AlertCircle,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(login(values)).unwrap();
        toast.success("✅ Welcome back! Let's continue your health journey.");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error || "❌ Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900">
      {/* Left Panel */}
      <aside className="relative lg:w-2/5 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white p-16 flex flex-col justify-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-120px] left-[-120px] w-[280px] h-[280px] rounded-full bg-purple-700 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-140px] w-[320px] h-[320px] rounded-full bg-indigo-700 opacity-20 blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <Link to="/" aria-label="Go to homepage" className="flex items-center gap-4 mb-16">
            <div className="bg-purple-700 p-5 rounded-3xl shadow-lg flex items-center justify-center">
              <Heart className="w-14 h-14 text-indigo-400 animate-pulse" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight select-none leading-tight">
              Health <span className="text-indigo-400">Mate</span>
            </h1>
          </Link>

          <h2 className="text-4xl font-semibold leading-snug mb-6">
            Your personal health companion
          </h2>
          <p className="text-indigo-300 leading-relaxed text-lg max-w-md mb-10">
            Track your vitals, analyze reports, and stay ahead with personalized insights — all in one secure place.
          </p>

          {/* Key Benefits */}
          <ul className="space-y-6">
            {[
              { icon: <Heart className="w-8 h-8 text-indigo-400" />, text: "Trusted by thousands worldwide" },
              { icon: <Mail className="w-8 h-8 text-indigo-400" />, text: "Instant notifications and updates" },
              { icon: <Lock className="w-8 h-8 text-indigo-400" />, text: "Privacy-first health data protection" },
            ].map(({ icon, text }, i) => (
              <li key={i} className="flex items-center gap-4 font-medium text-indigo-200 text-lg">
                {icon}
                {text}
              </li>
            ))}
          </ul>

          <footer className="absolute bottom-8 text-indigo-400 text-sm select-none">
            &copy; 2025 HealthMate. All rights reserved.
          </footer>
        </div>
      </aside>

      {/* Right Panel */}
      <main className="lg:w-3/5 flex items-center justify-center p-12 bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-700 relative">
          {/* Floating Heart Icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full p-4 shadow-lg animate-bounce">
            <Heart className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-4xl font-extrabold text-white mb-4 text-center">
            Welcome Back
          </h3>
          <p className="text-gray-400 mb-8 text-center">
            Sign in to unlock your health vault
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-xl py-4 pl-14 pr-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    formik.touched.email && formik.errors.email
                      ? "focus:ring-red-500 border-red-500 border"
                      : "focus:ring-indigo-500 border border-gray-600"
                  } transition`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 mt-2 flex items-center gap-2 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-300 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Lock className="w-6 h-6" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-xl py-4 pl-14 pr-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    formik.touched.password && formik.errors.password
                      ? "focus:ring-red-500 border-red-500 border"
                      : "focus:ring-indigo-500 border border-gray-600"
                  } transition`}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 mt-2 flex items-center gap-2 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formik.isValid || !formik.dirty}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white py-4 rounded-xl font-extrabold text-lg transition-shadow shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {loading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-10 text-center text-gray-400 text-sm font-medium">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-500 font-semibold">
              Create one
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gray-500 hover:text-indigo-400 font-medium inline-flex items-center gap-2">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
