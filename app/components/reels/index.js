// app/page.js
import Navbar from "./Navba";
import Sidebar from "./Sidebar";
import MainPage from "../pages/ReelGenerator/MainPage";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <MainPage />
      </div>
    </div>
  );
}
