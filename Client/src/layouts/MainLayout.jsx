import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ onLogout }) => {
  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Sidebar - hidden on mobile, visible on medium+ screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar onLogout={onLogout} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
