import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { 
  Heart, FileText, Activity, Shield, Menu, X, 
  ChevronDown, Star, Mail, Phone, 
  MapPin, Send, MessageSquare, Clock, Users
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Contact Form Validation Schema
const contactValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .nullable(),
});

const Landing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  // Contact Form
  const contactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setContactLoading(true);
      try {
        const response = await axios.post(`${API_URL}/contact`, values);
        toast.success("✅ Message sent successfully! We'll get back to you soon.");
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || "❌ Failed to send message. Please try again.");
      } finally {
        setContactLoading(false);
      }
    },
  });

  // FAQ Data
  const faqs = [
    {
      question: "What is HealthMate?",
      answer: "HealthMate is an AI-powered personal health companion that helps you manage your medical reports, track vitals, and get easy-to-understand health insights in both English and Roman Urdu.",
    },
    {
      question: "Is my health data secure?",
      answer: "Yes! Your health data is encrypted and stored securely. We use industry-standard security practices and only you have access to your medical records.",
    },
    {
      question: "How does the AI report analysis work?",
      answer: "Our AI (powered by Google Gemini) reads your uploaded medical reports (PDFs or images) and provides simple explanations, highlights abnormal values, and suggests questions to ask your doctor.",
    },
    {
      question: "Can I use HealthMate without uploading reports?",
      answer: "Absolutely! You can manually track your vitals like blood pressure, sugar levels, weight, and more even without uploading any lab reports.",
    },
    {
      question: "Is HealthMate free to use?",
      answer: "Yes, HealthMate is completely free to use. Just create an account and start managing your health records.",
    },
    {
      question: "Can HealthMate replace my doctor?",
      answer: "No. HealthMate is for understanding and tracking your health data only. Always consult your doctor for medical advice and treatment decisions.",
    },
    {
      question: "What languages does HealthMate support?",
      answer: "HealthMate provides bilingual support in English and Roman Urdu, making it accessible for everyone.",
    },
    {
      question: "What file formats can I upload?",
      answer: "You can upload medical reports in PDF format or as images (JPG, PNG). Our AI can read both types of files.",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Ahmed Khan",
      role: "Regular User",
      image: "👨‍💼",
      rating: 5,
      text: "HealthMate ne meri zindagi asaan kar di! Ab sab reports ek jagah hain aur AI samajh bhi deta hai. Bahut helpful!",
    },
    {
      name: "Fatima Ali",
      role: "Healthcare Professional",
      image: "👩‍⚕️",
      rating: 5,
      text: "As a doctor, I recommend HealthMate to my patients. It helps them track their health and ask better questions during visits.",
    },
    {
      name: "Bilal Ahmed",
      role: "Diabetes Patient",
      image: "👨",
      rating: 5,
      text: "I track my sugar levels daily. The timeline view helps me see patterns and manage my diabetes better. Amazing app!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
       <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 select-none transform transition duration-300 hover:scale-105"
          aria-label="HealthMate Home"
        >
          <div className="bg-sky-100 p-2 rounded-lg">
            <Heart className="w-8 h-8 text-sky-500" />
          </div>
          <span className="text-2xl font-bold whitespace-nowrap">
            <span className="text-sky-500">Health</span>
            <span className="text-gray-900">Mate</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#testimonials", label: "Testimonials" },
            { href: "#faq", label: "FAQ" },
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="text-gray-700 hover:text-sky-500 font-medium transition transform hover:scale-110 duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition hover:bg-gray-100"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transform origin-top transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
        } bg-white/95 backdrop-blur-sm shadow-inner border-t border-gray-200`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#testimonials", label: "Testimonials" },
            { href: "#faq", label: "FAQ" },
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-sky-500 font-semibold transition transform hover:scale-105 duration-200"
            >
              {label}
            </a>
          ))}

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sky-500 font-semibold hover:underline transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-sky-500 text-white rounded-lg py-2 text-center font-semibold shadow-lg hover:bg-sky-600 transition transform hover:scale-105 duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>


      {/* Hero Section */}
   <section className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
  <div className="container mx-auto px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

      {/* Left: Image */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl h-full">
        <img
          src="https://images.unsplash.com/photo-1578496479763-c21c718af028?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          alt="Health & AI concept"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/40 to-blue-700/40 mix-blend-multiply"></div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col justify-center px-4">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight
                       opacity-0 animate-fadeInUp animation-delay-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Health </span>
          <span className="text-sky-700">Mate</span>
        </h1>

        {/* Subheading */}
        <p className="text-2xl md:text-3xl font-semibold text-emerald-600 mb-6 tracking-wide uppercase drop-shadow-md
                      opacity-0 animate-pulseSlow animation-delay-400">
          Sehat ka Smart Dost
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-xl
                      opacity-0 animate-fadeIn animation-delay-700">
          Your personal <span className="font-semibold text-cyan-600">AI-powered</span> health companion.
          Upload medical reports, track vitals, and get instant explanations in English and Roman Urdu —
          all tailored to keep you informed and empowered.
        </p>

        {/* Buttons */}
        {!isAuthenticated && (
          <div className="flex gap-6 flex-wrap mb-12 opacity-0 animate-fadeInUp animation-delay-1000">
            <Link
              to="/register"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-3 rounded-full font-bold text-lg shadow-xl transition transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-cyan-400"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-50 text-cyan-600 border-2 border-cyan-600 px-10 py-3 rounded-full font-bold text-lg shadow-md transition hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          {[
            { label: "Free", value: "100%", colorFrom: "from-sky-500", colorTo: "to-cyan-400" },
            { label: "Powered", value: "AI", colorFrom: "from-emerald-500", colorTo: "to-green-400" },
            { label: "Secure", value: "🔒", colorFrom: "from-amber-500", colorTo: "to-yellow-400" },
          ].map(({ label, value, colorFrom, colorTo }, i) => (
            <div
              key={label}
              className={`bg-white/5 backdrop-blur-md border border-sky-700/30 shadow-inner shadow-blue-500/10 rounded-2xl p-2 py-5 text-center
                          transform transition duration-500 ease-out hover:shadow-2xl hover:scale-105 hover:border-sky-400/40
                          opacity-0 animate-popIn animation-delay-${1200 + i * 200}`}
            >
              <div
                className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${colorFrom} ${colorTo} bg-clip-text text-transparent drop-shadow-md animate-gradient-x`}
              > 
                {value}
              </div>
              <div className="mt-2 text-xs md:text-sm font-semibold tracking-wide uppercase text-black">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Animation CSS */}
    <style jsx>{`
      @keyframes gradient-x {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes pulseSlow {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      @keyframes popIn {
        0% {
          opacity: 0;
          transform: scale(0.95);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 5s ease infinite;
      }

      .animate-fadeInUp {
        animation: fadeInUp 0.8s ease forwards;
      }

      .animate-fadeIn {
        animation: fadeIn 1s ease forwards;
      }

      .animate-pulseSlow {
        animation: pulseSlow 3s ease-in-out infinite;
      }

      .animate-popIn {
        animation: popIn 0.6s ease forwards;
      }

      /* Delay utilities for animation delay */
      .animation-delay-100 { animation-delay: 0.1s; }
      .animation-delay-400 { animation-delay: 0.4s; }
      .animation-delay-700 { animation-delay: 0.7s; }
      .animation-delay-1000 { animation-delay: 1s; }
      .animation-delay-1200 { animation-delay: 1.2s; }
      .animation-delay-1400 { animation-delay: 1.4s; }
      .animation-delay-1600 { animation-delay: 1.6s; }
    `}</style>
  </div>
</section>

  
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
  <div className="container mx-auto px-6 max-w-7xl">
    {/* Heading */}
    <div className="text-center mb-20 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Powerful Features
      </h2>
      <p className="text-lg md:text-xl text-gray-600">
        Everything you need to manage your health in one place
      </p>
    </div>

    {/* Features grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          iconBg: "bg-sky-100",
          iconColor: "text-sky-600",
          title: "Upload Medical Reports",
          desc: "Upload PDFs or images of lab reports. AI automatically reads and explains results in simple language.",
          IconComponent: FileText,
        },
        {
          iconBg: "bg-emerald-100",
          iconColor: "text-emerald-600",
          title: "Track Vital Signs",
          desc: "Manually log BP, blood sugar, weight, heart rate, and more. View trends over time.",
          IconComponent: Activity,
        },
        {
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
          title: "Secure & Private",
          desc: "Your health data is encrypted and stored securely. Only you have access to your records.",
          IconComponent: Shield,
        },
        {
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          title: "Bilingual Support",
          desc: "Get explanations in both English and Roman Urdu. AI speaks your language!",
          IconComponent: MessageSquare,
        },
        {
          iconBg: "bg-pink-100",
          iconColor: "text-pink-600",
          title: "Health Timeline",
          desc: "View all your reports and vitals in chronological order. Track your health journey.",
          IconComponent: Clock,
        },
        {
          iconBg: "bg-indigo-100",
          iconColor: "text-indigo-600",
          title: "Family Friendly",
          desc: "Manage health records for yourself and your family members in one account.",
          IconComponent: Users,
        },
      ].map(({ iconBg, iconColor, title, desc, IconComponent }) => (
        <div
          key={title}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 border border-gray-100"
        >
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 ${iconBg} drop-shadow-md`}
          >
            <IconComponent className={`w-7 h-7 ${iconColor}`} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-white">
  <div className="container mx-auto px-6 max-w-5xl">
    {/* Header */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        How It Works
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
        Get started in 3 simple steps / Sirf 3 asaan steps
      </p>
    </div>

    {/* Timeline */}
    <div className="relative before:absolute before:top-10 before:bottom-10 before:left-8 before:w-1 before:bg-gradient-to-b before:from-cyan-500 before:to-blue-600">
      {[ 
        {
          step: "1",
          title: "Create Your Free Account",
          description: "Sign up in seconds with just your name and email. No credit card required. / Apna naam aur email se account banayein.",
          bgColor: "bg-cyan-500",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          ),
        },
        {
          step: "2",
          title: "Upload Reports or Add Vitals",
          description: "Upload PDF/image medical reports OR manually enter your BP, sugar, weight, etc. / Reports upload karein ya vitals manually add karein.",
          bgColor: "bg-emerald-500",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
            </svg>
          ),
        },
        {
          step: "3",
          title: "Get AI-Powered Insights",
          description: "Receive easy-to-understand explanations in English and Roman Urdu. Track your health timeline. / AI se samajh ke results hasil karein.",
          bgColor: "bg-amber-500",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
          ),
        },
      ].map(({ step, title, description, bgColor, icon }) => (
        <div key={step} className="relative flex items-start gap-8 mb-16 last:mb-0">
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-2xl shadow-lg ${bgColor} relative z-10`}>
              {step}
            </div>
            {/* Connector line except for last */}
            {step !== "3" && (
              <div className="flex-1 w-px bg-gradient-to-b from-cyan-500 to-blue-600 opacity-50 mt-2"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center mb-3 space-x-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-md ${bgColor} shadow-md`}>
                {icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials Section */}
     <section id="testimonials" className="py-24 bg-white">
  <div className="container mx-auto px-6 max-w-6xl">
    {/* Header */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
        What Our Users Say
      </h2>
      <p className="text-lg md:text-xl text-gray-600">
        Real feedback from real people / Asli log, asli reviews
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="grid md:grid-cols-3 gap-10">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          {/* User Info */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-inner flex items-center justify-center bg-cyan-50 text-4xl">
              {testimonial.image}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-xl">{testimonial.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{testimonial.role}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex gap-1 mb-5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400" />
            ))}
            {[...Array(5 - testimonial.rating)].map((_, i) => (
              <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 leading-relaxed italic text-lg">
            “{testimonial.text}”
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* FAQ Section */}
     <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 to-white">
  <div className="container mx-auto px-6 max-w-4xl">
    {/* Header */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
        Frequently Asked Questions
      </h2>
      <p className="text-lg md:text-xl text-gray-600">
        Aapke sawalat ke jawabat
      </p>
    </div>

    {/* FAQ Accordion */}
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <button
            onClick={() =>
              setActiveAccordion(activeAccordion === index ? null : index)
            }
            aria-expanded={activeAccordion === index}
            className="w-full flex items-center justify-between px-8 py-6 text-left rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 transition-colors hover:bg-cyan-50"
          >
            <span className="text-lg md:text-xl font-semibold text-gray-900">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-7 h-7 text-cyan-600 transform transition-transform duration-500 ${
                activeAccordion === index ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Answer panel with smooth height and fade animation */}
          <div
            className={`px-8 pb-6 max-w-[90ch] text-gray-700 leading-relaxed transition-[max-height,opacity,padding] duration-500 ease-in-out overflow-hidden ${
              activeAccordion === index
                ? "max-h-[500px] opacity-100 pt-2"
                : "max-h-0 opacity-0 pt-0"
            }`}
          >
            <p className="select-text">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Contact Form Section */}
     <section id="contact" className="py-24 bg-gradient-to-br from-white to-sky-50">
  <div className="container mx-auto px-6 max-w-6xl">
    {/* Header */}
    <div className="text-center mb-20">
      <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-sm">
        Get In Touch
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Have questions? We'd love to hear from you <br /> <span className="text-sky-600 font-semibold">Koi sawal? Hum se rabta karein</span>
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-16">
      {/* Contact Info */}
      <div className="space-y-10 animate-fadeInLeft">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-sky-500 inline-block pb-2">
          Contact Information
        </h3>
        <div className="space-y-6">
          {[
            {
              iconBg: "bg-sky-100",
              iconColor: "text-sky-600",
              icon: <Mail className="w-7 h-7" />,
              title: "Email",
              info: "support@healthmate.com",
            },
            {
              iconBg: "bg-emerald-100",
              iconColor: "text-emerald-600",
              icon: <Phone className="w-7 h-7" />,
              title: "Phone",
              info: "+92 300 1234567",
            },
            {
              iconBg: "bg-amber-100",
              iconColor: "text-amber-600",
              icon: <MapPin className="w-7 h-7" />,
              title: "Location",
              info: "Karachi, Pakistan",
            },
          ].map(({ iconBg, iconColor, icon, title, info }, i) => (
            <div key={i} className="flex items-center gap-5">
              <div className={`${iconBg} p-4 rounded-xl shadow-md flex items-center justify-center`}>
                {React.cloneElement(icon, { className: iconColor })}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                <p className="text-gray-600">{info}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-sky-100 to-emerald-100 p-6 rounded-3xl shadow-md animate-fadeInUp">
          <h4 className="font-bold text-gray-900 text-xl mb-2 flex items-center gap-2">
            <span>💡</span> Quick Tip
          </h4>
          <p className="text-gray-700 leading-relaxed">
            We typically respond within 24-48 hours. For urgent matters, please call us directly.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-10 rounded-3xl shadow-sm animate-fadeInRight">
        <form onSubmit={contactForm.handleSubmit} className="space-y-6">
          {[
            { label: "Name *", name: "name", type: "text", placeholder: "Your name" },
            { label: "Email *", name: "email", type: "email", placeholder: "your@email.com" },
            { label: "Phone (Optional)", name: "phone", type: "tel", placeholder: "03001234567" },
            { label: "Subject *", name: "subject", type: "text", placeholder: "What's this about?" },
          ].map(({ label, name, type, placeholder }, i) => (
            <div key={i}>
              <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
              </label>
              <input
                id={name}
                type={type}
                name={name}
                value={contactForm.values[name]}
                onChange={contactForm.handleChange}
                onBlur={contactForm.handleBlur}
                placeholder={placeholder}
                className={`w-full px-5 py-3 border rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-shadow ${
                  contactForm.touched[name] && contactForm.errors[name]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300"
                }`}
              />
              {contactForm.touched[name] && contactForm.errors[name] && (
                <p className="mt-1 text-sm text-red-600">{contactForm.errors[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={contactForm.values.message}
              onChange={contactForm.handleChange}
              onBlur={contactForm.handleBlur}
              placeholder="Your message"
              className={`w-full px-5 py-3 border rounded-xl resize-none text-gray-900 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-shadow ${
                contactForm.touched.message && contactForm.errors.message
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {contactForm.touched.message && contactForm.errors.message && (
              <p className="mt-1 text-sm text-red-600">{contactForm.errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={contactLoading || !contactForm.isValid}
            className="w-full flex justify-center items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {contactLoading ? (
              <>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending your message...
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  </div>

  {/* Animations - Tailwind plugin or CSS in JS */}
  <style jsx>{`
    @keyframes fadeInLeft {
      0% {
        opacity: 0;
        transform: translateX(-30px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes fadeInRight {
      0% {
        opacity: 0;
        transform: translateX(30px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeInLeft {
      animation: fadeInLeft 0.8s ease forwards;
    }
    .animate-fadeInRight {
      animation: fadeInRight 0.8s ease forwards;
    }
    .animate-fadeInUp {
      animation: fadeInUp 1s ease forwards;
    }
  `}</style>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-8 h-8 text-sky-400" />
                <span className="text-2xl font-bold">
                  <span className="text-sky-400">Health</span>Mate
                </span>
              </div>
              <p className="text-gray-400">
                Sehat ka Smart Dost 💚
              </p>
              <p className="text-gray-400 mt-2">
                Your AI-powered personal health companion.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-sky-400 transition">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-sky-400 transition">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-sky-400 transition">Testimonials</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-sky-400 transition">FAQ</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-gray-400 hover:text-sky-400 transition">Create Account</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-sky-400 transition">Sign In</Link></li>
                <li><a href="#contact" className="text-gray-400 hover:text-sky-400 transition">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@healthmate.com</li>
                <li>📱 +92 300 1234567</li>
                <li>📍 Karachi, Pakistan</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-100 text-center md:text-left">
                &copy; 2025 HealthMate. All rights reserved.
              </p>
              <div className="border border-gray-200 px-4 py-2 rounded-lg">
                <p className="text-white text-sm font-medium">
                  ⚕️ For understanding only, not medical advice / Sirf samajhne ke liye, ilaaj ke liye nahi
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

