import { NavLink, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const navItems = [
        { name: "Overview", icon: <FiHome size={18} />, path: "/", exact: true },
    ];

    return (
        <aside className="w-[20%] min-h-screen bg-white border-r border-slate-200 flex flex-col justify-between fixed left-0 top-0 p-6 shadow-sm transition-all duration-300">
            <div>
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                            DT
                        </div>
                        <h1 className="text-xl font-semibold text-slate-800">
                            DebtTrackr
                        </h1>
                    </div>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                                    isActive
                                        ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer px-3 py-2 text-slate-600 hover:text-red-500 transition-colors duration-200 text-sm"
            >
                <FiLogOut size={18} />
                <span>Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;