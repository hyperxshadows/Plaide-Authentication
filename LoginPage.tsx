import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { email: "", password: "", general: "" };
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      try {
        await login(email, password);
        navigate("/home");
      } catch (error: any) {
        console.error("Login error:", error);
        let errorMessage = "Invalid email or password. Please try again.";
        
        if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please try again later.";
        }
        
        setErrors({ email: "", password: "", general: errorMessage });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: "Please enter your email address", password: "", general: "" });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address", password: "", general: "" });
      return;
    }

    try {
      await resetPassword(email);
      setResetEmailSent(true);
      setTimeout(() => setResetEmailSent(false), 5000);
    } catch (error: any) {
      console.error("Password reset error:", error);
      setErrors({ email: "", password: "", general: "Failed to send reset email. Please try again." });
    }
  };

  const handleBackToWelcome = () => {
    navigate("/");
  };

  return (
    <main className="flex h-screen items-center justify-center relative bg-[linear-gradient(117deg,rgba(240,253,244,1)_0%,rgba(239,246,255,1)_50%,rgba(250,245,255,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full min-w-[393px]">
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#d1fae5] border border-[#6ee7b7] text-[#059669] px-6 py-3 rounded-lg shadow-lg z-50 [font-family:'Comfortaa',Helvetica] font-medium text-sm animate-fade-in">
          {successMessage}
        </div>
      )}
      <div className="flex flex-col w-[361px] items-start gap-6 relative animate-fade-in">
        <button
          onClick={handleBackToWelcome}
          className="flex items-center gap-2 text-[#00a63e] hover:text-[#008235] transition-all duration-300 hover:gap-3 cursor-pointer"
          type="button"
          aria-label="Back to welcome page"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="[font-family:'Comfortaa',Helvetica] font-medium text-sm">
            Back
          </span>
        </button>

        <header className="relative self-stretch w-full">
          <img
            className="mx-auto w-20 h-20 mb-6"
            alt="Plaide logo"
            src="https://c.animaapp.com/f2hTreMt/img/container.svg"
          />

          <div className="flex flex-col items-center gap-2">
            <h1 className="[font-family:'Comfortaa',Helvetica] font-semibold text-[#016630] text-3xl text-center tracking-[0] leading-9">
              Welcome Back
            </h1>
            <p className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-base text-center tracking-[0] leading-[26px]">
              Sign in to continue to plaide
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <span className="[font-family:'Comfortaa',Helvetica] text-red-600 text-sm">
                {errors.general}
              </span>
            </div>
          )}
          {resetEmailSent && (
            <div className="p-3 bg-[#d1fae5] border border-[#6ee7b7] rounded-lg animate-fade-in">
              <span className="[font-family:'Comfortaa',Helvetica] text-[#059669] text-sm font-medium">
                Password reset email sent! Check your inbox.
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="[font-family:'Comfortaa',Helvetica] font-medium text-[#008235] text-sm"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-white rounded-lg border border-solid border-[#b8f7cf] [font-family:'Comfortaa',Helvetica] text-[#008235] text-sm focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="[font-family:'Comfortaa',Helvetica] text-red-500 text-xs">
                {errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="[font-family:'Comfortaa',Helvetica] font-medium text-[#008235] text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 bg-white rounded-lg border border-solid border-[#b8f7cf] [font-family:'Comfortaa',Helvetica] text-[#008235] text-sm focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00a63e] hover:text-[#008235] transition-colors duration-300"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="[font-family:'Comfortaa',Helvetica] text-red-500 text-xs">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="self-end [font-family:'Comfortaa',Helvetica] font-medium text-[#00a63e] text-sm hover:text-[#008235] hover:underline transition-all duration-300 cursor-pointer"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#00a63e] rounded-lg [font-family:'Comfortaa',Helvetica] font-medium text-white text-sm hover:bg-[#008f37] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:ring-offset-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-sm">
              Don't have an account?
            </span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="[font-family:'Comfortaa',Helvetica] font-medium text-[#00a63e] text-sm hover:text-[#008235] hover:underline transition-all duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
