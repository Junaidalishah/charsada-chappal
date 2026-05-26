import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Mobile Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-[#f8f6f1]/90 px-4 py-4 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          <h1 className="font-serif text-lg font-bold text-[#061b0e]">
            Charsadda Chappal
          </h1>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
