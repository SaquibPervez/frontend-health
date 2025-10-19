import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { getReports } from "../store/slices/reportSlice";
import { getVitals } from "../store/slices/vitalsSlice";
import {
  FileText,
  Activity,
  Upload,
  LogOut,
  User,
  Calendar,
  TrendingUp,
  Brain,
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  Plus,
  BarChart3,
  Heart
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { reports, loading: reportsLoading } = useSelector((state) => state.reports);
  const { vitals, loading: vitalsLoading } = useSelector((state) => state.vitals);

  useEffect(() => {
    dispatch(getReports({ limit: 5 }));
    dispatch(getVitals({ limit: 5 }));
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("👋 Logged out successfully");
    navigate("/");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate health insights
  const totalEntries = reports.length + vitals.length;
  const recentActivity = [...reports, ...vitals]
    .sort((a, b) => new Date(b.createdAt || b.reportDate || b.recordDate) - new Date(a.createdAt || a.reportDate || a.recordDate))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-cyan-50/30">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 group"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    Health
                  </span>
                  <span className="text-gray-900">Mate</span>
                </span>
                <p className="text-xs text-gray-500 font-medium">AI Health Companion</p>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-2xl border border-blue-200/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all duration-300 bg-white hover:bg-red-50 px-4 py-2 rounded-2xl border border-gray-200 hover:border-red-200 font-semibold group"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {user?.name}
              </span>
              ! 👋
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your AI-powered health dashboard is ready. Track, analyze, and understand your health data.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              to: "/upload",
              gradient: "from-blue-500 to-cyan-500",
              hoverGradient: "from-blue-600 to-cyan-600",
              icon: Upload,
              title: "Upload Report",
              description: "Upload lab reports for AI analysis and insights",
              action: "Upload Now",
              delay: "0ms"
            },
            {
              to: "/add-vitals",
              gradient: "from-emerald-500 to-green-500",
              hoverGradient: "from-emerald-600 to-green-600",
              icon: Activity,
              title: "Add Vitals",
              description: "Record blood pressure, sugar, weight and more",
              action: "Add Vitals",
              delay: "100ms"
            },
            {
              to: "/timeline",
              gradient: "from-purple-500 to-pink-500",
              hoverGradient: "from-purple-600 to-pink-600",
              icon: BarChart3,
              title: "Health Timeline",
              description: "View your complete health journey and trends",
              action: "View Timeline",
              delay: "200ms"
            }
          ].map(({ to, gradient, hoverGradient, icon: Icon, title, description, action, delay }) => (
            <Link
              key={title}
              to={to}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
              style={{ animationDelay: delay }}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {description}
              </p>

              {/* Action Button */}
              <div className="flex items-center gap-2 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {action}
                </span>
                <ArrowRight className={`w-4 h-4 ${gradient.replace('from-', 'text-').split(' ')[0]}`} />
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${gradient} opacity-5 rounded-tr-3xl`}></div>
            </Link>
          ))}
        </div>

        {/* Stats & Insights */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {/* Main Stat Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Brain className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Health Overview</h3>
                  <p className="text-blue-100 text-sm">AI-Powered Insights</p>
                </div>
              </div>
              <div className="text-5xl font-black mb-2">{totalEntries}</div>
              <p className="text-blue-100 font-semibold">Total Health Records</p>
            </div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          {/* Secondary Stats */}
          {[
            {
              gradient: "from-emerald-500 to-green-500",
              icon: FileText,
              count: reports.length,
              label: "Medical Reports",
              description: "AI analyzed"
            },
            {
              gradient: "from-amber-500 to-orange-500",
              icon: Activity,
              count: vitals.length,
              label: "Vital Records",
              description: "Tracked"
            }
          ].map(({ gradient, icon: Icon, count, label, description }, index) => (
            <div
              key={label}
              className={`bg-gradient-to-br ${gradient} rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
            >
              <div className="relative z-10">
                <Icon className="w-8 h-8 mb-4 opacity-90" />
                <div className="text-3xl font-black mb-1">{count}</div>
                <div className="text-sm font-semibold opacity-90">{label}</div>
                <div className="text-xs opacity-75 mt-1">{description}</div>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Recent Activity & Health Data */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Reports */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Reports</h2>
                </div>
                <Link
                  to="/timeline"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="p-6">
              {reportsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No reports yet</p>
                  <p className="text-gray-400 mt-2">Upload your first medical report</p>
                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Upload Report
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.slice(0, 4).map((report) => (
                    <Link
                      key={report._id}
                      to={`/report/${report._id}`}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 group"
                    >
                      <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-500 transition-colors">
                        <FileText className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{report.reportType}</p>
                      </div>
                      <div className="text-right">
                        <time className="text-sm text-gray-400 group-hover:text-blue-600 transition-colors">
                          {formatDate(report.reportDate)}
                        </time>
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1 ml-auto"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Vitals */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-2 rounded-xl">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Vitals</h2>
                </div>
                <Link
                  to="/timeline"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="p-6">
              {vitalsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
              ) : vitals.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No vitals recorded</p>
                  <p className="text-gray-400 mt-2">Start tracking your health metrics</p>
                  <Link
                    to="/add-vitals"
                    className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Add Vitals
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {vitals.slice(0, 4).map((vital) => (
                    <div
                      key={vital._id}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 group"
                    >
                      <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-500 transition-colors">
                        <Activity className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {vital.bloodPressure && `BP: ${vital.bloodPressure.systolic}/${vital.bloodPressure.diastolic}`}
                          {vital.bloodSugar && ` | Sugar: ${vital.bloodSugar.value}`}
                          {vital.weight && ` | Weight: ${vital.weight.value}kg`}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {vital.notes || "No additional notes"}
                        </p>
                      </div>
                      <div className="text-right">
                        <time className="text-sm text-gray-400 group-hover:text-emerald-600 transition-colors">
                          {formatDate(vital.recordDate)}
                        </time>
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1 ml-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Insights Panel */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 rounded-3xl p-8 text-white shadow-2xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Health Insights</h2>
              <p className="text-blue-200 text-sm">Powered by advanced analytics</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-cyan-300 mb-3" />
              <h3 className="font-semibold mb-2">Data Security</h3>
              <p className="text-blue-200 text-sm">Your health data is encrypted and secure</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Brain className="w-8 h-8 text-emerald-300 mb-3" />
              <h3 className="font-semibold mb-2">Smart Analysis</h3>
              <p className="text-blue-200 text-sm">AI-powered insights from your reports</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-amber-300 mb-3" />
              <h3 className="font-semibold mb-2">Trend Tracking</h3>
              <p className="text-blue-200 text-sm">Monitor your health progress over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;