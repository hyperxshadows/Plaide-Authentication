import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const SignUpPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRequirements.minLength || !passwordRequirements.hasNumber || !passwordRequirements.hasUpperCase || !passwordRequirements.hasLowerCase || !passwordRequirements.hasSpecialChar) {
      newErrors.password = "Password does not meet all requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      setIsLoading(true);
      try {
        // Extract username from email for display name
        const username = formData.email.split('@')[0];
        await signup(formData.email, formData.password, username);
        // Navigate to login page with success message
        navigate("/login", { state: { message: "Account created successfully! Please sign in." } });
      } catch (error: any) {
        console.error("Sign up error:", error);
        let errorMessage = "Failed to create account. Please try again.";
        
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered. Please sign in instead.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak. Please use a stronger password.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        }
        
        setErrors({ ...newErrors, general: errorMessage });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBackToWelcome = () => {
    navigate("/");
  };

  return (
    <main className="flex h-screen items-center justify-center relative bg-[linear-gradient(117deg,rgba(240,253,244,1)_0%,rgba(239,246,255,1)_50%,rgba(250,245,255,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full min-w-[393px]">
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
              Create Account
            </h1>
            <p className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-base text-center tracking-[0] leading-[26px]">
              Join plaide and start cooking
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

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="[font-family:'Comfortaa',Helvetica] font-medium text-[#008235] text-sm"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-white rounded-lg border border-solid border-[#b8f7cf] [font-family:'Comfortaa',Helvetica] text-[#008235] text-sm focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:border-transparent"
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
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full h-12 px-4 pr-12 bg-white rounded-lg border border-solid border-[#b8f7cf] [font-family:'Comfortaa',Helvetica] text-[#008235] text-sm focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:border-transparent transition-all duration-300"
                placeholder="Create a password"
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
            {(passwordFocused || formData.password) && (
              <div className="flex flex-col gap-2 mt-2 p-4 bg-[#d1fae5] rounded-lg border border-solid border-[#6ee7b7] animate-fade-in">
                <div className="flex items-center gap-2 transition-all duration-300">
                  {passwordRequirements.minLength ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-fade-in">
                      <circle cx="8" cy="8" r="8" fill="#10b981"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#6b7280"/>
                      <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className={`[font-family:'Comfortaa',Helvetica] text-xs font-medium transition-colors duration-300 ${passwordRequirements.minLength ? 'text-[#059669]' : 'text-[#6b7280]'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 transition-all duration-300">
                  {passwordRequirements.hasNumber ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-fade-in">
                      <circle cx="8" cy="8" r="8" fill="#10b981"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#6b7280"/>
                      <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className={`[font-family:'Comfortaa',Helvetica] text-xs font-medium transition-colors duration-300 ${passwordRequirements.hasNumber ? 'text-[#059669]' : 'text-[#6b7280]'}`}>
                    At least one number
                  </span>
                </div>
                <div className="flex items-center gap-2 transition-all duration-300">
                  {passwordRequirements.hasUpperCase ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-fade-in">
                      <circle cx="8" cy="8" r="8" fill="#10b981"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#6b7280"/>
                      <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className={`[font-family:'Comfortaa',Helvetica] text-xs font-medium transition-colors duration-300 ${passwordRequirements.hasUpperCase ? 'text-[#059669]' : 'text-[#6b7280]'}`}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 transition-all duration-300">
                  {passwordRequirements.hasLowerCase ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-fade-in">
                      <circle cx="8" cy="8" r="8" fill="#10b981"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#6b7280"/>
                      <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className={`[font-family:'Comfortaa',Helvetica] text-xs font-medium transition-colors duration-300 ${passwordRequirements.hasLowerCase ? 'text-[#059669]' : 'text-[#6b7280]'}`}>
                    At least one lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 transition-all duration-300">
                  {passwordRequirements.hasSpecialChar ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-fade-in">
                      <circle cx="8" cy="8" r="8" fill="#10b981"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#6b7280"/>
                      <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className={`[font-family:'Comfortaa',Helvetica] text-xs font-medium transition-colors duration-300 ${passwordRequirements.hasSpecialChar ? 'text-[#059669]' : 'text-[#6b7280]'}`}>
                    At least one special character
                  </span>
                </div>
              </div>
            )}
            {errors.password && (
              <span className="[font-family:'Comfortaa',Helvetica] text-red-500 text-xs">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="[font-family:'Comfortaa',Helvetica] font-medium text-[#008235] text-sm"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 px-4 pr-12 bg-white rounded-lg border border-solid border-[#b8f7cf] [font-family:'Comfortaa',Helvetica] text-[#008235] text-sm focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00a63e] hover:text-[#008235] transition-colors duration-300"
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword && (
              <span className="[font-family:'Comfortaa',Helvetica] text-red-500 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#00a63e] rounded-lg [font-family:'Comfortaa',Helvetica] font-medium text-white text-sm hover:bg-[#008f37] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:ring-offset-2 transition-all duration-300 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-sm">
              Already have an account?
            </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="[font-family:'Comfortaa',Helvetica] font-medium text-[#00a63e] text-sm hover:text-[#008235] hover:underline transition-all duration-300 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
