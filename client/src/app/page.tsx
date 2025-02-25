"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useClerk } from "@clerk/clerk-react";
import { useAuth } from "../lib/useAuth";

export default function Home() {
  const { openSignIn, openSignUp, signOut } = useClerk();
  const { isAuthenticated, isLoading, navigateToDashboard } = useAuth();

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex min-h-screen flex-col items-center px-6 md:px-24 pt-28 relative overflow-hidden animate-fadeIn"
      style={{
        background:
          "linear-gradient(135deg, #f3e8ff 0%, #fff9e6 50%, #ffffff 100%)",
      }}
    >
      <div className="thin-string-effect"></div>
      {/* Animated background elements with staggered fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-[80px] animate-pulse"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute top-40 right-20 w-96 h-96 bg-yellow-100/40 rounded-full blur-[100px] animate-float"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="absolute bottom-20 left-40 w-80 h-80 bg-blue-50/30 rounded-full blur-[90px] animate-pulse"
        />
      </motion.div>

      {/* Transparent Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl backdrop-blur-sm bg-white/10 rounded-full border border-white/20 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4">
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#2d2d2d] transition-colors duration-300 hover:text-[#1a1a1a]"
            >
              <Image
                src="/logo.png"
                alt="FinFlow Logo"
                width={10}
                height={10}
                priority
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
              FF
            </Link>
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {["Features", "Solutions", "Pricing", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-[#2d2d2d]/80 hover:text-[#2d2d2d] transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2d2d2d] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={navigateToDashboard}
                      className="button-style"
                    >
                      Dashboard
                    </button>
                    <button onClick={() => signOut()} className="button-style">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => openSignIn()}
                      className="button-style"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openSignUp()}
                      className="button-style"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[-100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform animate-shine" />
        </div>
      </nav>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-100/40 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-blue-50/30 rounded-full blur-[90px] animate-pulse" />
      </div>

      {/* Floating fi.png with framer-motion */}
      <motion.div
        className="absolute top-20 right-20"
        initial={{ rotateY: 0 }}
        animate={{
          rotateY: [0, 360, 720, 1080, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <Image
          src="/fi.png"
          alt="Feature Icon"
          width={320}
          height={320}
          className="transition-all duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-3xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#2d2d2d] leading-tight mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)]">
            Powerful banking.
            <br />
            Simplified finances.
          </h1>

          <p className="text-lg sm:text-xl text-[#2d2d2d]/80 mb-12 leading-relaxed animate-fadeIn delay-200">
            Apply in 10 minutes for online business banking that transforms how
            you operate.
          </p>
        </div>

        {/* Email signup section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slideUp delay-300">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 sm:px-6 py-3 rounded-full w-full sm:w-80 bg-white/90 border border-purple-100 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all hover:shadow-lg"
          />
          <button className="px-6 sm:px-8 py-3 rounded-full bg-[#2d2d2d] text-white">
            Open Account
          </button>
          <button className="px-6 sm:px-8 py-3 rounded-full bg-white text-[#2d2d2d] border border-gray-200">
            Contact Sales
          </button>
        </div>

        {/* Dashboard Preview Images with Animation */}
        <div className="mt-12 max-w-[1000px] mx-auto relative animate-slideUp delay-500">
          <div className="relative">
            {/* Main image with a static dark shadow */}
            <Image
              src="/img.webp"
              alt="finflow Dashboard Preview"
              width={1000}
              height={600}
              className="w-full rounded-xl shadow-2xl transition-all duration-500"
              style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))" }}
            />
          </div>
        </div>

        {/* Scrolling Text Section */}
        <div className="w-full max-w-7xl mx-auto py-32">
          <motion.h2
            className="text-[4rem] font-serif italic text-center mb-24 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              lineHeight: "1.2",
            }}
          >
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              Manage
            </span>{" "}
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              your
            </span>{" "}
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              finances
            </span>{" "}
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              like
            </span>
            <br />
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              never before.
            </span>
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto text-center space-y-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed font-light hover:text-[#2d2d2d] transition-all duration-500 transform hover:scale-105">
              <motion.span
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                className="inline-block text-[#2d2d2d]/80"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Scaleup Finance provides fractional CFO services to help
                <br />
                <span className="font-medium bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                  startups master their finances.
                </span>
              </motion.span>
            </p>

            <div className="relative mt-16">
              <p className="text-2xl leading-relaxed tracking-wide">
                <motion.span
                  initial={{ opacity: 0.4 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-[#2d2d2d]/80 inline-block hover:text-[#2d2d2d] cursor-default"
                >
                  Our CFOs bring battle-tested expertise to your{" "}
                </motion.span>
                {["planning", "budgeting", "financial strategy"].map(
                  (word, index) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0.4 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                      className="text-[#2d2d2d] inline-block font-medium hover:text-purple-400 transition-colors duration-300 cursor-default"
                    >
                      {word}
                      {index < 2 ? ", " : " "}
                    </motion.span>
                  )
                )}
                <motion.span
                  initial={{ opacity: 0.4 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-[#2d2d2d]/90 inline-block hover:text-[#2d2d2d] cursor-default"
                >
                  ensuring you make{" "}
                  <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                    confident decisions
                  </span>{" "}
                  backed by data
                </motion.span>
              </p>
            </div>

            <motion.p
              className="text-lg text-gray-600 mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Trusted by some of the fastest-growing businesses around.
            </motion.p>
          </motion.div>
        </div>

        {/* Brand Logos Scrolling Section */}
        <div className="w-full max-w-7xl mx-auto py-16 bg-white/5 backdrop-blur-sm">
          <motion.div
            className="flex space-x-12 hover:pause-animation"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* First set of logos */}
            {[
              {
                src: "https://www.datocms-assets.com/136830/1724182842-logo-forbes.svg",
                alt: "Forbes",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182857-logo-barrons.svg",
                alt: "Barrons",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182873-logo-axios.svg",
                alt: "Axios",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182885-logo-marketwatch.svg",
                alt: "MarketWatch",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182900-logo-fast-company.svg",
                alt: "Fast Company",
              },
            ].map((logo, index) => (
              <div
                key={index}
                className="flex-none w-48 h-12 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={138}
                  height={31}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {[
              {
                src: "https://www.datocms-assets.com/136830/1724182842-logo-forbes.svg",
                alt: "Forbes",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182857-logo-barrons.svg",
                alt: "Barrons",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182873-logo-axios.svg",
                alt: "Axios",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182885-logo-marketwatch.svg",
                alt: "MarketWatch",
              },
              {
                src: "https://www.datocms-assets.com/136830/1724182900-logo-fast-company.svg",
                alt: "Fast Company",
              },
            ].map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-none w-48 h-12 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={138}
                  height={31}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-[#2d2d2d]/70 mt-12 max-w-[800px] mx-auto backdrop-blur-sm bg-white/30 p-4 rounded-full animate-fadeIn delay-700">
          Mercury is a financial technology company, not a bank. Banking
          services provided by Choice Financial Group, Column N.A., and Evolve
          Bank & Trust®; Members FDIC.
        </p>
      </motion.div>

      {/* Network Section */}
      <div
        className="w-full max-w-7xl mx-auto py-32"
        style={{
          background:
            "linear-gradient(135deg, #fff9e6 0%, #f5e6d3 50%, #ffffff 100%)",
          borderRadius: "2rem",
          padding: "4rem",
          margin: "2rem auto",
        }}
      >
        {/* Header */}
        <div className="text-left mb-16">
          <h3 className="text-[#6b7280] text-2xl mb-4">Do not miss deals</h3>
          <div className="flex justify-between items-start">
            <h2 className="text-[3.5rem] font-bold text-[#2d2d2d] leading-tight max-w-2xl">
              Get the most from your team is network
            </h2>
            <p className="text-[#6b7280] text-lg max-w-sm">
              Stay up to date by syncing connections across your entire team.
            </p>
          </div>
        </div>

        {/* Network Visualization Card */}
        <div className="relative w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#f5e6d3] via-[#f9f1ea] to-[#fff9f5] rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-[0_25px_60px_rgba(173,_148,_124,_0.8)] shadow-[0_20px_50px_rgba(173,_148,_124,_0.7)] overflow-hidden transition-all duration-500"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f5e6d3 0%, #efe0d3 25%, #f9f1ea 50%, #fff9f5 100%)",
            }}
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/img1.png"
                alt="Network Visualization"
                fill
                className="object-cover rounded-xl transform hover:scale-[1.02] transition-transform duration-500"
                quality={70}
                priority
              />
              {/* Top-right grid pattern */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
                <svg width="100%" height="100%" className="stroke-gray-600">
                  {/* Vertical lines */}
                  <line x1="20%" y1="0" x2="20%" y2="100%" strokeWidth="0.5" />
                  <line x1="45%" y1="0" x2="45%" y2="70%" strokeWidth="0.5" />
                  <line
                    x1="75%"
                    y1="20%"
                    x2="75%"
                    y2="100%"
                    strokeWidth="0.5"
                  />
                  <line x1="90%" y1="0" x2="90%" y2="90%" strokeWidth="0.5" />

                  {/* Horizontal lines */}
                  <line x1="0" y1="25%" x2="100%" y2="25%" strokeWidth="0.5" />
                  <line
                    x1="20%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    strokeWidth="0.5"
                  />
                  <line x1="0" y1="75%" x2="80%" y2="75%" strokeWidth="0.5" />
                  <line
                    x1="40%"
                    y1="90%"
                    x2="100%"
                    y2="90%"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* Bottom-left grid pattern */}
              <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20">
                <svg width="100%" height="100%" className="stroke-gray-600">
                  {/* Vertical lines */}
                  <line x1="30%" y1="0" x2="30%" y2="90%" strokeWidth="0.5" />
                  <line
                    x1="55%"
                    y1="20%"
                    x2="55%"
                    y2="100%"
                    strokeWidth="0.5"
                  />
                  <line x1="80%" y1="0" x2="80%" y2="75%" strokeWidth="0.5" />

                  {/* Horizontal lines */}
                  <line
                    x1="20%"
                    y1="35%"
                    x2="100%"
                    y2="35%"
                    strokeWidth="0.5"
                  />
                  <line x1="0" y1="60%" x2="90%" y2="60%" strokeWidth="0.5" />
                  <line
                    x1="30%"
                    y1="85%"
                    x2="100%"
                    y2="85%"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="w-full max-w-7xl mx-auto mt-32 mb-40 space-y-24">
        {/* Inner shadow overlay */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              "linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), transparent)",
            boxShadow: "inset 0 2px 6px rgba(255, 255, 255, 0.4)",
          }}
        />

        {/* Grain Overlay */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Light effect */}
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Content with enhanced shadows */}
        <div className="relative z-10">
          {/* Smart Spend Control Card */}
          <div className="flex items-center justify-between gap-16 hover:transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex-1">
              <span className="inline-block px-4 py-1 bg-[#E3F5EF] text-[#0F172A] rounded-full text-sm mb-6">
                SMART SPEND CONTROL
              </span>
              <h2 className="text-4xl font-bold text-[#2d2d2d] mb-4">
                Control spend with ease
              </h2>
              <p className="text-[#6b7280] text-lg mb-8 leading-relaxed">
                Feel confident with control mechanisms built into every type of
                spend. Whether it is proactive card controls, custom approval
                flows, or PO 3-way matching — we have got you covered.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
              >
                Learn more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-[#f5e6d3]/40 via-white/60 to-[#f9f1ea]/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg overflow-hidden border border-[#f5e6d3]/30 hover:shadow-xl transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 230, 211, 0.4) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(249, 241, 234, 0.5) 100%)",
                  boxShadow: "0 8px 32px 0 rgba(173, 148, 124, 0.2)",
                }}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#f5e6d3]/10 to-transparent pointer-events-none z-10" />
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/vid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Decorative corner effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                    <svg
                      width="100%"
                      height="100%"
                      className="stroke-[#ad947c]"
                    >
                      <line
                        x1="70%"
                        y1="0"
                        x2="70%"
                        y2="60%"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="85%"
                        y1="0"
                        x2="85%"
                        y2="40%"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="100%"
                        y1="15%"
                        x2="60%"
                        y2="15%"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="100%"
                        y1="30%"
                        x2="70%"
                        y2="30%"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Expense Management Card */}
          <div className="flex items-center justify-between gap-16 hover:transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-[#f5e6d3]/40 via-white/60 to-[#f9f1ea]/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg overflow-hidden border border-[#f5e6d3]/30 hover:shadow-xl transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 230, 211, 0.4) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(249, 241, 234, 0.5) 100%)",
                  boxShadow: "0 8px 32px 0 rgba(173, 148, 124, 0.2)",
                }}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#f5e6d3]/10 to-transparent pointer-events-none z-10" />
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/vid2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Decorative corner effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                    <svg
                      width="100%"
                      height="100%"
                      className="stroke-[#ad947c]"
                    >
                      <line
                        x1="70%"
                        y1="0"
                        x2="70%"
                        y2="60%"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="85%"
                        y1="0"
                        x2="85%"
                        y2="40%"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="100%"
                        y1="15%"
                        x2="60%"
                        y2="15%"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="100%"
                        y1="30%"
                        x2="70%"
                        y2="30%"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex-1">
              <span className="inline-block px-4 py-1 bg-[#E3F5EF] text-[#0F172A] rounded-full text-sm mb-6">
                AUTOMATED EXPENSE MANAGEMENT
              </span>
              <h2 className="text-4xl font-bold text-[#2d2d2d] mb-4">
                Make expense reports easier than ever
              </h2>
              <p className="text-[#6b7280] text-lg mb-8 leading-relaxed">
                Get an expense management experience employees love with all of
                the controls. Capture receipts with a snap, while automated
                expense categorisation and approval flows streamline finance and
                accounting processes.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
              >
                Learn more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom light effect */}
        <div
          className="absolute -bottom-1/4 -left-1/4 w-full h-full rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245,230,211,0.8) 0%, transparent 60%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Revenue Recognition Section */}
      <div
        className="w-full max-w-[90rem] mx-auto py-32 relative rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f5e6d3 0%, #fff9f5 25%, #f9f1ea 50%, #f5e6d3 75%, #efe0d3 100%)",
          boxShadow: "inset 0 0 120px rgba(92, 64, 51, 0.1)",
          padding: "4rem 6rem",
        }}
      >
        {/* Grain Overlay */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(245, 230, 211, 0.8) 0%, transparent 60%), radial-gradient(circle at bottom right, rgba(92, 64, 51, 0.05) 0%, transparent 60%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-[85rem] mx-auto">
          {/* Header with Features List */}
          <div className="flex justify-between mb-20">
            <div className="max-w-xl">
              <span className="text-sm text-gray-600 mb-4 block">
                ASC 606 and IFRS 15 compliant
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6">
                Complex revenue recognition,
                <br /> made simple
              </h2>
              <p className="text-xl text-[#6b7280] mb-8">
                Track deferred, recognized, billed and unbilled revenue in a
                dedicated sub-ledger.
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <p className="text-[#2d2d2d]">
                    Automate journal reports and speed up your month-end
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <p className="text-[#2d2d2d]">
                    Instantly review detailed tables, charts, and journal
                    entries
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <p className="text-[#2d2d2d]">
                    Export journals to your general ledger
                  </p>
                </div>
              </div>
            </div>

            {/* Right side table preview */}
            <div
              className="w-[450px] rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_35px_85px_-15px_rgba(92,64,51,0.55)] transform hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(145deg, #f5e6d3 0%, #fff9f5 50%, #f9f1ea 100%)",
                boxShadow: "0 20px 50px -10px rgba(92, 64, 51, 0.45)",
              }}
            >
              {/* Header */}
              <div
                className="p-6 border-b border-[#8B7355]/10"
                style={{
                  background:
                    "linear-gradient(to right, rgba(245, 230, 211, 0.5), rgba(255, 249, 245, 0.5))",
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[#5C4033] font-semibold text-lg">
                    Deferred revenue
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8B7355] text-sm">Total:</span>
                    <span className="text-[#5C4033] font-semibold">
                      $8,400.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Revenue Chart */}
                <div className="relative w-full h-[200px] mb-6 overflow-hidden rounded-xl group">
                  <Image
                    className="absolute -top-2 left-6 scale-125 select-none [mask-image:linear-gradient(black_calc(100%-180px),transparent_99%)] sm:h-full sm:max-w-fit sm:object-cover sm:object-left lg:-top-3"
                    alt=""
                    loading="lazy"
                    width={1778}
                    height="860"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src="/rev5.png"
                  />
                  <Image
                    className="rounded-[17px] [mask-image:linear-gradient(black_calc(100%-180px),transparent_99%)] sm:h-full sm:max-w-fit sm:translate-y-8 sm:object-cover sm:object-left"
                    alt=""
                    loading="lazy"
                    width={684}
                    height="333"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src="/rev.webp"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right bottom, rgba(245, 230, 211, 0.1), rgba(92, 64, 51, 0.2))",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-[#8B7355] text-sm">Total Deferred</p>
                    <p className="text-[#5C4033] text-xl font-semibold">
                      $1,200.00
                    </p>
                  </div>
                </div>

                {/* Table content */}
                <div className="space-y-4">
                  {[
                    {
                      company: "Google Ltd",
                      type: "Platform fee",
                      progress: "22%",
                    },
                    {
                      company: "DocuSign Ltd",
                      type: "Platform fee",
                      progress: "44%",
                    },
                    {
                      company: "Intercom BV",
                      type: "Platform fee",
                      progress: "63%",
                    },
                    {
                      company: "Loom Inc",
                      type: "Platform fee",
                      progress: "51%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group relative p-4 rounded-lg transition-all duration-300 hover:bg-[#f5e6d3]/30"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(245, 230, 211, 0.1))",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D2B48C] p-[1px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <span className="text-[#5C4033] font-medium">
                                {item.company.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-[#5C4033] group-hover:text-[#8B7355] transition-colors">
                              {item.company}
                            </p>
                            <p className="text-sm text-[#8B7355]">
                              {item.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-[#5C4033]">
                            {item.progress}
                          </span>
                          <div className="w-24 h-2 rounded-full bg-[#f5e6d3]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#8B7355] to-[#D2B48C] transition-all duration-500 group-hover:from-[#5C4033] group-hover:to-[#8B7355]"
                              style={{ width: item.progress }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Graphs Section */}
          <div className="grid grid-cols-3 gap-8">
            {/* Main Revenue Chart */}
            <div
              className="col-span-3 rounded-xl p-8 relative overflow-hidden transform transition-all duration-500 hover:shadow-[0_35px_85px_-15px_rgba(92,64,51,0.55)] hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(145deg, #f5e6d3 0%, #fff9f5 50%, #f9f1ea 100%)",
                boxShadow: "0 20px 50px -10px rgba(92, 64, 51, 0.45)",
              }}
            >
              {/* Grain Overlay */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                  <h3 className="font-medium text-[#8B7355] mb-2">
                    Recognized revenue
                  </h3>
                  <div className="text-4xl font-bold text-[#5C4033]">
                    $96,316.10
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4cff0b]"></div>
                    <span className="text-sm text-[#6B4423]">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff0707]"></div>
                    <span className="text-sm text-[#6B4423]">Previous</span>
                  </div>
                </div>
              </div>

              {/* Three images aligned */}
              <div className="grid grid-cols-3 gap-8">
                <div className="group">
                  <div
                    className="relative h-[240px] overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(92,64,51,0.4)] group-hover:scale-[1.02]"
                    style={{
                      boxShadow: "0 10px 30px -5px rgba(92, 64, 51, 0.25)",
                    }}
                  >
                    <Image
                      src="/rev1.png"
                      alt="Revenue Analysis"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Monthly Revenue</p>
                      <p className="text-sm opacity-80">Last 12 months</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div
                    className="relative h-[240px] overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(92,64,51,0.4)] group-hover:scale-[1.02]"
                    style={{
                      boxShadow: "0 10px 30px -5px rgba(92, 64, 51, 0.25)",
                    }}
                  >
                    <Image
                      src="/rev2.png"
                      alt="Revenue Metrics"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Growth Rate</p>
                      <p className="text-sm opacity-80">Quarter over Quarter</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div
                    className="relative h-[240px] overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(92,64,51,0.4)] group-hover:scale-[1.02]"
                    style={{
                      boxShadow: "0 10px 30px -5px rgba(92, 64, 51, 0.25)",
                    }}
                  >
                    <Image
                      src="/rev4.png"
                      alt="Revenue Overview"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Revenue Breakdown</p>
                      <p className="text-sm opacity-80">By Category</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fruitful Membership Section */}
      <motion.div
        className="w-full relative py-16 sm:py-24 overflow-hidden my-16 sm:my-32 mx-4 sm:mx-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          background:
            "linear-gradient(135deg, #E6D5C3 0%, #D4C4B4 50%, #F5E6D3 100%)",
          borderRadius: "64px",
          boxShadow: "0 25px 50px -12px rgba(92,64,51,0.25)",
        }}
      >
        {/* Gradient overlays with rounded corners */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(107,68,35,0.15),transparent_50%)] rounded-[64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.2),transparent_50%)] rounded-[64px]" />

        {/* Grain texture with rounded corners */}
        <div
          className="absolute inset-0 opacity-20 rounded-[64px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            filter: "contrast(150%) brightness(1000%)",
          }}
        />

        {/* Main content container */}
        <div className="w-full px-4 sm:px-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-7xl text-center mb-8 text-[#6B4423]"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: [1.2, 1], opacity: 1 }}
              transition={{
                duration: 1,
                scale: {
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                },
              }}
              viewport={{ once: true }}
            >
              Fruitful Membership
            </motion.h2>

            <div className="text-center mb-12">
              <p className="text-gray-600 flex items-center justify-center gap-2">
                Membership is risk-free for 30 days
                <span className="w-5 h-5 rounded-full border border-gray-300 inline-flex items-center justify-center text-sm">
                  i
                </span>
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-16">
              <button className="px-8 py-3 bg-black text-white rounded-full">
                <span className="block text-sm">Solo</span>
                <span className="text-xs text-gray-400">For just you</span>
              </button>
              <button className="px-8 py-3 border border-gray-200 rounded-full">
                <span className="block text-sm">Joint</span>
                <span className="text-xs text-gray-500">
                  For you and your partner
                </span>
              </button>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 py-8 sm:py-12">
              {[
                {
                  price: "98",
                  period: "Monthly",
                  text: "$98 paid every month",
                  image: "/nat1.webp",
                  leaf: "/nat2.webp",
                  rotate: "-8deg",
                },
                {
                  price: "92",
                  period: "Quarterly",
                  text: "$275 paid every 3 months",
                  image: "/nat4.webp",
                  leaf: "/nat3.webp",
                  popular: true,
                  rotate: "0deg",
                  scale: 1.05,
                },
                {
                  price: "83",
                  period: "Annual",
                  text: "$996 paid every year",
                  image: "/nat4.webp",
                  leaf: "/nat.png",
                  rotate: "8deg",
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative p-6 sm:p-8 overflow-hidden group transition-all duration-500 ${
                    index === 1 ? "md:scale-105" : ""
                  }`}
                  initial={{
                    opacity: 0,
                    y: 50,
                    rotate: plan.rotate || "0deg",
                    scale: plan.scale || 1,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: plan.rotate || "0deg",
                    scale: plan.scale || 1,
                  }}
                  whileHover={{
                    rotate: "0deg",
                    scale: 1.05,
                    y: -20,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  style={{
                    borderRadius: "32px",
                    boxShadow:
                      index === 1
                        ? "0 25px 50px -12px rgba(92,64,51,0.45)"
                        : "0 20px 40px -10px rgba(92,64,51,0.35)",
                    transformOrigin: "center center",
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-baseline mb-1">
                      <span className="text-xl sm:text-2xl">$</span>
                      <span className="text-5xl sm:text-7xl">{plan.price}</span>
                      <span className="text-sm">/month</span>
                    </div>
                    <h3 className="text-xl font-medium text-[#6B4423] mb-2">
                      {plan.period}
                    </h3>
                    <p className="text-sm text-[#8B5E3C]">{plan.text}</p>
                  </div>

                  {/* Decorative leaf image */}
                  <motion.div
                    className="absolute top-2 right-2 w-24 h-24"
                    initial={{ rotate: 0, y: 0 }}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      y: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: 0,
                    }}
                  >
                    <Image
                      src={plan.leaf}
                      alt="Decorative leaf"
                      width={100}
                      height={100}
                      className="object-contain opacity-60"
                    />
                  </motion.div>

                  {/* Background nature image */}
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-24 h-24"
                    initial={{ scale: 1, rotate: 45 }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [45, 55, 45],
                    }}
                    transition={{
                      duration: 8,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: 0,
                    }}
                  >
                    <Image
                      src={plan.image}
                      alt="Nature decoration"
                      width={100}
                      height={100}
                      className="object-contain opacity-15"
                    />
                  </motion.div>

                  <button
                    className={`w-full py-3 px-6 rounded-full mt-8 relative z-10 transition-all duration-300 border shadow-lg ${
                      index === 1
                        ? "bg-[#6B4423] text-white hover:bg-[#8B5E3C]"
                        : "border-[#6B4423] text-[#6B4423] hover:bg-[#6B4423] hover:text-white"
                    }`}
                  >
                    Start with {plan.period.toLowerCase()}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#8B5E3C] rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6B4423] rounded-full blur-[120px] opacity-15 translate-x-1/3 translate-y-1/3" />
      </motion.div>

      {/* Footer CTA Section */}
      <section className="w-full py-20 sm:py-40 px-4 sm:px-0 relative overflow-hidden">
        {/* Corner ovals with increased size and opacity */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, #8B5E3C 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, #8B5E3C 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, #6B4423 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, #6B4423 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Existing gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1E23]/90 via-[#2A2E33]/90 to-[#2C2420]/90" />

        <div className="max-w-[90rem] mx-auto px-4 sm:px-12 relative z-10">
          <div className="max-w-5xl">
            <motion.h2
              className="text-4xl sm:text-7xl text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join the embedded banking movement.
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Give your customers an experience so smooth they don&apos;t even
              notice financial steps.
              <span className="block mt-2">Banking becomes invisible.</span>
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
              <button className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base">
                Talk to an expert
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base">
                Explore the Sandbox
              </button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/2 h-2/3 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Additional brown gradient overlays */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5E3C] rounded-full blur-[150px] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B4423] rounded-full blur-[150px] opacity-5" />
      </section>
    </motion.main>
  );
}
