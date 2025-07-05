import { useState, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion, useInView } from "framer-motion";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaAccessibleIcon,
  FaGlobeAmericas,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";
import CTASection from "../components/AboutUsComp/CTASection";

export default function Contact() {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formRef = useRef(null);
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  const isFormInView = useInView(formRef, { once: true });
  const isHeroInView = useInView(heroRef, { once: true });
  const isInfoInView = useInView(infoRef, { once: true });
  const isMapInView = useInView(mapRef, { once: true });

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      element?.focus();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message: " + result.error);
      }
    } catch (err) {
      alert("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Office Location",
      content: "Kigali, Rwanda – Gasabo District",
      detail: "KG 7 Ave, Kimisagara",
      color: "text-[#952301]",
    },
    {
      icon: FaPhone,
      title: "Phone Number",
      content: "+250 795 022 500",
      detail: "Available 24/7 for urgent matters",
      color: "text-[#952301]",
    },
    {
      icon: FaEnvelope,
      title: "Email Address",
      content: "info@nexventures.net",
      detail: "We respond within 24 hours",
      color: "text-[#952301]",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      content: "Mon - Fri: 8:00 AM - 6:00 PM",
      detail: "Sat: 9:00 AM - 2:00 PM",
      color: "text-[#952301]",
    },
  ];

  const reasons = [
    {
      icon: FaRocket,
      title: "Innovation First",
      description:
        "We bring cutting-edge solutions to your business challenges",
    },
    {
      icon: FaUsers,
      title: "Expert Team",
      description: "Our diverse team of professionals delivers excellence",
    },
    {
      icon: FaHandshake,
      title: "Partnership",
      description: "We work alongside you as your trusted technology partner",
    },
    {
      icon: FaLightbulb,
      title: "Creative Solutions",
      description: "Custom approaches tailored to your unique needs",
    },
  ];

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
    : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800";

  const cardBgClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const textClass = darkMode ? "text-gray-300" : "text-gray-600";
  const inputBgClass = darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white border-gray-300";
  const borderHoverClass = darkMode
    ? "hover:border-gray-500"
    : "hover:border-gray-400";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`${bgClass} min-h-screen`}
    >
      <Navbar />

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative overflow-hidden bg-gradient-to-r from-[#952301] via-[#611701] to-[#952301] text-white py-20"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div variants={itemVariants}>
            <FaGlobeAmericas className="text-6xl mx-auto mb-6 opacity-80" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform your ideas into reality? Let's start a
            conversation that could change everything.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 text-lg"
          >
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaAccessibleIcon className="inline mr-2" />
              Accessible Design
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaHandshake className="inline mr-2" />
              Partnership Focus
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaRocket className="inline mr-2" />
              Innovation Driven
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-full md:max-w-11/12 mx-auto px-6 py-16">
        {/* Contact Information Cards */}
        <motion.div
          ref={infoRef}
          initial="hidden"
          animate={isInfoInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0px 0px rgba(149, 35, 1, 0.1)",
              }}
              className={`${cardBgClass} p-6 rounded-2xl transition-all duration-300 border`}
            >
              <div className="flex items-center mb-4">
                <info.icon className={`text-3xl ${info.color} mr-3`} />
                <h3 className="text-lg font-semibold">{info.title}</h3>
              </div>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } font-medium mb-2`}
              >
                {info.content}
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {info.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={`${cardBgClass} p-8 rounded-3xl border`}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Send Us a Message
              </h2>
              <p className={textClass}>
                We'd love to hear from you. Fill out the form below and we'll
                get back to you as soon as possible.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-12"
              >
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className={textClass}>
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-gradient-to-r from-[#952301] to-[#611701] text-white px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                className="space-y-6"
                noValidate
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border-2 rounded-xl transition-all duration-300 ${inputBgClass} ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : focusedField === "name"
                        ? "border-[#952301]"
                        : `${borderHoverClass}`
                    }`}
                    placeholder="Enter your full name"
                    required
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border-2 rounded-xl transition-all duration-300 ${inputBgClass} ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : focusedField === "email"
                        ? "border-[#952301]"
                        : `${borderHoverClass}`
                    }`}
                    placeholder="Enter your email address"
                    required
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border-2 rounded-xl transition-all duration-300 ${inputBgClass} ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : focusedField === "subject"
                        ? "border-[#952301]"
                        : `${borderHoverClass}`
                    }`}
                    required
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="project">Project Proposal</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Technical Support</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.subject}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full p-4 border-2 rounded-xl transition-all duration-300 ${inputBgClass} resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : focusedField === "message"
                        ? "border-[#952301]"
                        : `${borderHoverClass}`
                    }`}
                    placeholder="Tell us about your project or inquiry..."
                    required
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#952301] to-[#611701]"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Sending Message...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } text-center`}
                >
                  * Required fields. We respect your privacy and will never
                  share your information.
                </p>
              </motion.form>
            )}
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2
                className={`text-3xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Why Choose NexVentures?
              </h2>
              <p className={`${textClass} text-lg leading-relaxed mb-8`}>
                We're more than just a technology company. We're your partners
                in innovation, committed to delivering solutions that drive real
                business value.
              </p>
            </motion.div>

            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className={`flex items-start space-x-4 p-6 ${cardBgClass} rounded-2xl transition-all duration-300 border`}
              >
                <div className="flex-shrink-0">
                  <reason.icon className="text-3xl text-[#952301]" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {reason.title}
                  </h3>
                  <p className={textClass}>{reason.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Media Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-[#952301] to-[#611701] text-white p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <p className="mb-6 opacity-90">
                Follow us on social media for the latest updates, insights, and
                behind-the-scenes content.
              </p>
              <div className="flex space-x-6">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-3xl hover:text-blue-200 transition-colors duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  className="text-3xl hover:text-blue-200 transition-colors duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-3xl hover:text-blue-200 transition-colors duration-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <FaLinkedin />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          ref={mapRef}
          initial="hidden"
          animate={isMapInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Visit Our Office
            </h2>
            <p className={`text-xl ${textClass} max-w-2xl mx-auto`}>
              Located in the heart of Kigali, we're easily accessible and always
              ready to welcome you for a face-to-face conversation.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
            <iframe
              title="NexVentures Office Location - Kigali, Rwanda"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.5739200979897!2d30.08919401532807!3d-1.944073698592761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6f1d4ddfb01%3A0x0!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1625736540244!5m2!1sen!2srw"
              width="100%"
              height="500"
              allowFullScreen
              loading="lazy"
              className="w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          animate={isMapInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center bg-gradient-to-r from-[#952301] to-[#611701] text-white py-16 px-8 rounded-3xl"
        >
          <motion.div variants={itemVariants}>
            <FaHandshake className="text-6xl mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Whether you're looking for a project partner, have a question, or
              want to explore a tech idea—NexVentures is here to listen,
              understand, and deliver exceptional results.
            </p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="tel:+250795022500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#952301] px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center"
              >
                <FaPhone className="mr-2" />
                Call Us Now
              </motion.a>
              <motion.a
                href="mailto:info@nexventures.net"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center"
              >
                <FaEnvelope className="mr-2" />
                Email Us
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <CTASection darkMode={darkMode} />
      <Footer />
    </motion.section>
  );
}
