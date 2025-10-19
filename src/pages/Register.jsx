import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { 
  Heart, Mail, Lock, User, Loader, AlertCircle, 
  CheckCircle, Shield, FileText, Activity,
  ArrowLeft, ArrowRight, Sparkles, Brain
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation Schema
const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase, one lowercase letter and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          register({
            name: values.name,
            email: values.email,
            password: values.password,
          })
        ).unwrap();
        toast.success("🎉 Account created successfully! Welcome to HealthMate!");
        navigate("/dashboard");
      } catch (error) {
        toast.error(
          error || "❌ Registration failed. Please try again."
        );
      }
    },
  });

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: "bg-gray-200", text: "" };
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const colors = {
      0: "bg-gray-200",
      1: "bg-red-400",
      2: "bg-orange-400",
      3: "bg-yellow-400",
      4: "bg-blue-400",
      5: "bg-green-400"
    };
    
    const texts = {
      0: "",
      1: "Very Weak",
      2: "Weak",
      3: "Fair",
      4: "Good",
      5: "Strong"
    };
    
    return { strength, color: colors[strength], text: texts[strength] };
  };

  const passwordStrength = getPasswordStrength(formik.values.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50 flex">
      {/* Left Side - Enhanced Information Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-sky-600 to-teal-600 p-14 flex-col justify-between relative overflow-hidden select-none">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-20 blur-2xl"></div>
        </div>

        {/* AI Network Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)]"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-4 mb-14 group">
            <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 border border-white/10">
              <Brain className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
            <span className="text-5xl font-black text-white tracking-tight">
              Health<span className="bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">Mate</span>
            </span>
          </Link>

          {/* Enhanced Main Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">AI-Powered Health Platform</span>
              </div>
              
              <h1 className="text-6xl font-black text-white leading-tight tracking-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Health Journey
                </span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                Intelligent health record management with AI-driven insights to help you make better healthcare decisions.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { icon: FileText, title: "Smart Report Analysis", desc: "AI-powered interpretation of medical reports" },
                { icon: Activity, title: "Vital Trends Tracking", desc: "Comprehensive health monitoring with insights" },
                { icon: Shield, title: "Enterprise Security", desc: "End-to-end encrypted data protection" }
              ].map(({ icon: Icon, title, desc }, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                  <div className="bg-white/10 p-3 rounded-xl flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-white/70 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="relative z-10 mt-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <p className="text-white/80 italic text-sm leading-relaxed">
                "HealthMate revolutionized how we manage family health records. The AI insights helped us catch early warning signs we would have missed."
              </p>
              <p className="text-white/60 text-sm mt-3 font-medium">— Dr. Sarah Chen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8 animate-fade-in">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group transition-transform hover:scale-105">
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  Join <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">HealthMate</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">Your AI Health Companion</p>
              </div>
            </Link>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-2 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            </div>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Free Forever
              </span>
              No credit card required
            </p>
          </div>

          {/* Enhanced Form Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {[
                {
                  label: "Full Name",
                  name: "name",
                  type: "text",
                  icon: User,
                  placeholder: "Enter your full name",
                },
                {
                  label: "Email Address",
                  name: "email",
                  type: "email",
                  icon: Mail,
                  placeholder: "your@email.com",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  icon: Lock,
                  placeholder: "Create a strong password",
                },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  type: "password",
                  icon: Lock,
                  placeholder: "Confirm your password",
                },
              ].map(({ label, name, type, icon: Icon, placeholder }, index) => (
                <div key={name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-sky-500" />
                    {label}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={placeholder}
                      className={`relative w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-200 ${
                        formik.touched[name] && formik.errors[name]
                          ? "border-red-400 focus:ring-red-400"
                          : formik.touched[name] && !formik.errors[name]
                          ? "border-green-400 focus:ring-green-400"
                          : "border-gray-200 focus:border-sky-500"
                      } group-hover:border-gray-300`}
                      autoComplete={type === "password" ? "new-password" : "off"}
                    />
                    <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      formik.touched[name] && formik.errors[name]
                        ? "text-red-400"
                        : formik.touched[name] && !formik.errors[name]
                        ? "text-green-400"
                        : "text-gray-400"
                    }`} />
                    
                    {/* Password Strength Indicator */}
                    {name === "password" && formik.values.password && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">{passwordStrength.text}</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <div
                              key={item}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                item <= passwordStrength.strength ? passwordStrength.color : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Success Checkmark */}
                    {formik.touched[name] && !formik.errors[name] && name !== "password" && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-bounce" />
                    )}
                  </div>
                  {formik.touched[name] && formik.errors[name] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2 animate-shake">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {formik.errors[name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Enhanced Submit Button */}
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <button
                  type="submit"
                  disabled={loading || !formik.isValid || !formik.dirty}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform disabled:scale-100 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Creating Account</span>
                        <span className="text-white/70">•</span>
                        <span className="text-white/80 text-sm">Securing your health data...</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span>Create Account • Start Your Journey</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Enhanced Sign In Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sky-500 hover:text-sky-600 font-semibold transition-colors duration-200 hover:underline inline-flex items-center gap-1"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>

          {/* Enhanced Back to Home */}
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/" 
              className="text-gray-500 hover:text-sky-500 transition-colors duration-200 inline-flex items-center gap-2 group font-medium"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;