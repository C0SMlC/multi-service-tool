"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar";
import { SidebarProvider } from "../../context/SidebarContext";
import { usePathname } from "next/navigation";

export default function ReelsLayout({ children }) {
  const pathname = usePathname();

  const pageVariants = {
    initial: {
      opacity: 0,
      // scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      // scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="md:w-[15%] md:min-w-[250px]">
            <Sidebar />
          </div>
          <div className="md:w-[85%] flex-1 z-60 bg-midGrey relative">
            <AnimatePresence mode="wait" initial={false}>
              {children && (
                <motion.div
                  key={pathname}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  className="absolute inset-0 overflow-auto"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
