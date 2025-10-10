import { Link } from "react-router-dom";
import { FiTwitter, FiGithub, FiGlobe } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="border-t border-slate-100 bg-white py-10">
            <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600">
                <div>
                    <h3 className="font-semibold text-emerald-600 mb-2">DataTrackr</h3>
                    <p className="text-slate-500">
                        Track, manage, and optimize your data usage with real-time insights.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-slate-700">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-emerald-600">Home</Link></li>
                        <li><Link to="/#features" className="hover:text-emerald-600">Features</Link></li>
                        <li><Link to="/#pricing" className="hover:text-emerald-600">Pricing</Link></li>
                        <li><Link to="/#contact" className="hover:text-emerald-600">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-slate-700">Follow Us</h4>
                    <div className="flex gap-4 text-slate-600">
                        <a href="#" className="hover:text-emerald-600"><FiTwitter /></a>
                        <a href="#" className="hover:text-emerald-600"><FiGithub /></a>
                        <a href="#" className="hover:text-emerald-600"><FiGlobe /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} DataTrackr. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;