import { Bell, User } from "lucide-react";

const Header = () => {
    return (
        <header className="w-full flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>

            <div className="flex items-center gap-4">
                <button className="relative">
                    <Bell className="w-5 h-5 text-slate-600 hover:text-emerald-600 transition" />
                    <span className="absolute -top-1 -right-1 bg-emerald-600 h-2 w-2 rounded-full"></span>
                </button>
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User size={18} />
                </div>
            </div>
        </header>
    );
};

export default Header;