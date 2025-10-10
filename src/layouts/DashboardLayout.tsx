import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

    return (
        <div className="flex items-center min-h-screen bg-slate-50">
            <Sidebar />
            <main
                className={`ml-[20%]! w-[80%] flex-1 transition-all duration-300`}
            >
                <div className="h-[80px] bg-white border-b border-slate-100 px-6 flex items-center">
                    <Header />
                </div>
                <div className="h-[calc(100vh-80px)] overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;