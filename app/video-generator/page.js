import Navbar from "../components/reels/Navbar";
import Sidebar from "../components/Sidebar";
import ReelGenerator from "../components/pages/ReelGenerator";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="md:w-[15%] md:min-w-[250px]">
          <Sidebar />
        </div>
        <div className="md:w-[85%] flex-1 z-60">
          <ReelGenerator />
        </div>
      </div>
    </div>
  );
}
