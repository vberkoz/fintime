import { useState } from "react";
import { Link } from "@tanstack/react-router";
import OpenPanelLeft from "./icon/OpenPanelLeft";
import UserAvatar from "./icon/UserAvatar";
import Close from "./icon/Close";

interface PanelItem {
  label: string;
  to: string; // Change 'href' to 'to' for React Router compatibility
}

export default function TopNavBar() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);

  const openRightSidebar = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
    setIsLeftPanelOpen(false);
  }
  const closeRightSidebar = () => setIsRightPanelOpen(false);

  const openLeftSidebar = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
    setIsRightPanelOpen(false)
  }
  const closeLeftSidebar = () => setIsLeftPanelOpen(false);

  // Define menu items for left and right panels using 'to' instead of 'href'
  const leftPanelItems: PanelItem[] = [
    { label: "Dashboard", to: "/" },
    { label: "Income & Expenses", to: "/income-expenses" },
    { label: "Time Tracking", to: "/time-tracking" },
    { label: "Budgets", to: "/budgets" },
    { label: "Goals", to: "/goals" },
    { label: "Reports", to: "/reports" },
  ];

  const rightPanelItems: PanelItem[] = [
    { label: "My Account", to: "/account" },
    { label: "Settings", to: "/settings" },
    { label: "Logout", to: "/logout" },
  ];

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav
        className="bg-zinc-50 border-b border-zinc-300 flex items-center justify-between z-50"
        style={{ position: "relative", zIndex: 100 }}
      >
        {/* Left Sidebar Open Button */}
        <button
          onClick={openLeftSidebar}
          className="flex items-center p-3.5 text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500"
        >
          {isLeftPanelOpen ? <Close /> : <OpenPanelLeft />}
        </button>

        {/* Profile Icon / Right Sidebar Open Button */}
        <button
          onClick={openRightSidebar}
          className="flex items-center p-3.5 text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500"
        >
          {isRightPanelOpen ? <Close /> : <UserAvatar />}
        </button>
      </nav>

      {/* Sidebar Overlay (for both left and right) */}
      {(isRightPanelOpen || isLeftPanelOpen) && (
        <div
          className="fixed inset-0 bg-gray-900 transition-opacity duration-300"
          style={{
            opacity: isRightPanelOpen || isLeftPanelOpen ? 0.5 : 0,
            zIndex: 40,
          }}
          onClick={() => {
            if (isRightPanelOpen) closeRightSidebar();
            if (isLeftPanelOpen) closeLeftSidebar();
          }}
        ></div>
      )}

      {/* Left Sidebar Content */}
      {isLeftPanelOpen && (
        <aside
          className="fixed top-[48px] left-0 bottom-0 w-64 bg-zinc-50 shadow-lg z-50 transform transition-transform duration-300"
          style={{
            transform: isLeftPanelOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <ul className="pt-4">
            {leftPanelItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to} // Use 'to' instead of 'href'
                  onClick={closeLeftSidebar} // Close the left panel on click
                  className="block px-4 py-1.5 border-transparent border-l-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 [&.active]:bg-zinc-300 [&.active]:border-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Right Sidebar Content */}
      {isRightPanelOpen && (
        <aside
          className="fixed top-[48px] right-0 bottom-0 w-64 bg-zinc-50 shadow-lg z-50 transform transition-transform duration-300"
          style={{
            transform: isRightPanelOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <ul className="pt-4">
            {rightPanelItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to} // Use 'to' instead of 'href'
                  onClick={closeRightSidebar} // Close the right panel on click
                  className={`block px-4 py-1.5 border-transparent border-l-4 text-sm font-semibold ${item.label === "Logout"
                    ? "text-red-500"
                    : "text-zinc-700"
                    } hover:bg-zinc-200 [&.active]:bg-zinc-300 [&.active]:border-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}