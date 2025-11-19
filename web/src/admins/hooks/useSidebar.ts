import { useState, useEffect } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Load dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) setIsOpen(saved === "true");
  }, []);

  // Simpan saat berubah
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen.toString());
  }, [isOpen]);

  return [isOpen, setIsOpen] as const;
}
