import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full border-b border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-emerald-600">
                    DataTrackr
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm">
                    <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
                    <Link to="/#features" className="hover:text-emerald-600 transition">Features</Link>
                    <Link to="/#pricing" className="hover:text-emerald-600 transition">Pricing</Link>
                    <Link to="/#contact" className="hover:text-emerald-600 transition">Contact</Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login" className="text-sm hover:text-emerald-600 transition">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition"
                    >
                        Get Started
                    </Link>
                </div>

                <button
                    className="md:hidden text-slate-700"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
                    <Link to="/" className="block hover:text-emerald-600" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/#features" className="block hover:text-emerald-600" onClick={() => setOpen(false)}>Features</Link>
                    <Link to="/#pricing" className="block hover:text-emerald-600" onClick={() => setOpen(false)}>Pricing</Link>
                    <Link to="/#contact" className="block hover:text-emerald-600" onClick={() => setOpen(false)}>Contact</Link>
                    <hr className="my-2" />
                    <Link to="/login" className="block hover:text-emerald-600" onClick={() => setOpen(false)}>Login</Link>
                    <Link
                        to="/register"
                        className="block w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        onClick={() => setOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;