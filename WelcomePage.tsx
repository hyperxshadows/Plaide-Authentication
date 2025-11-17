import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const features = [
  {
    id: 1,
    icon: "https://c.animaapp.com/f2hTreMt/img/icon.svg",
    label: "Quick Recipes",
  },
  {
    id: 2,
    icon: "https://c.animaapp.com/f2hTreMt/img/icon-1.svg",
    label: "Any Serving Size",
  },
  {
    id: 3,
    icon: "https://c.animaapp.com/f2hTreMt/img/icon-2.svg",
    label: "Save Favorites",
  },
  {
    id: 4,
    icon: "https://c.animaapp.com/f2hTreMt/img/icon-3.svg",
    label: "AI Powered",
  },
];

export const WelcomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center relative bg-[linear-gradient(117deg,rgba(240,253,244,1)_0%,rgba(239,246,255,1)_50%,rgba(250,245,255,1)_100%)] w-full">
      <div className="flex flex-col w-[361px] items-start gap-6 relative py-8 animate-fade-in">
        <header className="relative self-stretch w-full">
          <img
            className="mx-auto w-20 h-20 mb-6"
            alt="Plaide logo"
            src="https://c.animaapp.com/f2hTreMt/img/container.svg"
          />

          <div className="flex flex-col items-center gap-2">
            <h1 className="[font-family:'Comfortaa',Helvetica] font-semibold text-[#016630] text-3xl text-center tracking-[0] leading-9">
              Welcome to plaide
            </h1>
            <p className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-base text-center tracking-[0] leading-[26px] px-2">
              Discover personalized recipes tailored to your taste, time, and dietary needs.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 grid-rows-2 h-40 gap-3 w-full" aria-label="Features">
          {features.map((feature, index) => (
            <article
              key={feature.id}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-[#ffffff99] rounded-[10px] border border-solid border-[#dbfbe6]"
            >
              <img className="w-5 h-5" alt="" src={feature.icon} aria-hidden="true" />
              <div className="[font-family:'Comfortaa',Helvetica] font-normal text-[#008235] text-sm text-center tracking-[0] leading-5">
                {feature.label}
              </div>
            </article>
          ))}
        </section>

        <nav className="flex flex-col items-start relative self-stretch w-full bg-[#ffffffcc] rounded-[14px] border border-solid border-[#dbfbe6] p-6">
          <div className="flex flex-col w-full items-start gap-4">
            <button
              className="all-[unset] box-border relative self-stretch w-full h-12 bg-[#00a63e] rounded-lg cursor-pointer hover:bg-[#008f37] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:ring-offset-2 transition-all duration-300"
              onClick={handleCreateAccount}
              type="button"
              aria-label="Create a new account"
            >
              <span className="absolute top-3.5 left-[99px] [font-family:'Comfortaa',Helvetica] font-medium text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
                Create Account
              </span>
            </button>

            <button
              className="relative self-stretch w-full h-12 bg-white rounded-lg border border-solid border-[#b8f7cf] cursor-pointer hover:bg-[#f0fdf4] hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:ring-offset-2 transition-all duration-300"
              onClick={handleSignIn}
              type="button"
              aria-label="Sign in to existing account"
            >
              <span className="absolute top-3.5 left-[60px] [font-family:'Comfortaa',Helvetica] font-medium text-[#008235] text-sm tracking-[0] leading-5 whitespace-nowrap">
                I Already Have an Account
              </span>
            </button>
          </div>
        </nav>

        <footer className="relative self-stretch w-full">
          <p className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-xs text-center tracking-[0] leading-[19.5px]">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Plaide is designed for recipe discovery and is not intended for
            collecting sensitive personal information.
          </p>
        </footer>
      </div>
    </main>
  );
};
