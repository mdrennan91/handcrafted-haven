"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    // Trigger a full page load — ensures server-side session is refreshed if not the <Header/> doenst change the actual login and sign out icon
    window.location.href = "/api/signout";
  };

  return (
    <button
      onClick={handleLogout}
      title="Log out"
      className="text-white p-3 rounded-md transition hover:bg-red-600 cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}
