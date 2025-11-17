import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <main className="flex min-h-screen items-center justify-center relative bg-[linear-gradient(117deg,rgba(240,253,244,1)_0%,rgba(239,246,255,1)_50%,rgba(250,245,255,1)_100%)] w-full">
      <div className="flex flex-col w-[361px] items-center gap-6 relative py-8 animate-fade-in">
        <div className="flex flex-col items-center gap-4 w-full">
          <img
            className="w-20 h-20"
            alt="Plaide logo"
            src="https://c.animaapp.com/f2hTreMt/img/container.svg"
          />
          
          <div className="flex flex-col items-center gap-2">
            <h1 className="[font-family:'Comfortaa',Helvetica] font-semibold text-[#016630] text-3xl text-center">
              Welcome, {currentUser.displayName || "User"}!
            </h1>
            <p className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-base text-center">
              You're now logged in to plaide
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full bg-[#ffffffcc] rounded-[14px] border border-solid border-[#dbfbe6] p-6">
          <div className="flex flex-col gap-2">
            <span className="[font-family:'Comfortaa',Helvetica] font-medium text-[#008235] text-sm">
              Email
            </span>
            <span className="[font-family:'Comfortaa',Helvetica] font-normal text-[#00a63e] text-sm">
              {currentUser.email}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full h-12 bg-[#00a63e] rounded-lg [font-family:'Comfortaa',Helvetica] font-medium text-white text-sm hover:bg-[#008f37] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00a63e] focus:ring-offset-2 transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};
