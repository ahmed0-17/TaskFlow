import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/50
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
    <div className="min-h-dvh min-w-0 lg:ml-72">
  <Header
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
  />
<main
  className="
    min-w-0
    w-full
    overflow-x-hidden
    px-4 pb-4 pt-20
    sm:px-6 sm:pb-6 sm:pt-24
    lg:px-8 lg:pb-8 lg:pt-28
  "
>
  <Outlet />
</main>
</div>
    </div>
  );
}

export default MainLayout;