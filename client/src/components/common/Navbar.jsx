import { TbHomeFilled } from "react-icons/tb";
import { RiAuctionFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../slices/profileSlice";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { disconnectSocket } from "../../services/socketService";
import Notification from "../core/Notification/Notification";

import { motion } from "motion/react";
import { FaGavel, FaUser } from "react-icons/fa"

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await fetch("https://auctioneer-server.vercel.app/api/v1/auth/logout", {
            method:"POST",
            credentials: "include"
        });

        disconnectSocket();
        
        dispatch(setUser(null));
        localStorage.removeItem('user');
        toast.success("Logged Out");
        navigate('/');
    }

    const {user} = useSelector((state) => state.profile);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <FaGavel className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Auctioneer
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/auctions" className="text-slate-600 hover:text-blue-600 flex items-center gap-4 transition-all duration-300">
                            <FaGavel />
                            <span>Auctions</span>
                        </Link>
                        <Link to="/about" className="text-slate-600 hover:text-blue-600 flex items-center gap-4 transition-all duration-300">
                            <FaUser />
                            <span>About</span>
                        </Link>
                    </div>

                    {
                        !user &&
                        <div className="flex items-center space-x-8">
                            <Link to="/login">
                                <div className="hover:bg-blue-50 px-4 py-2 rounded-md transition-all duration-300">
                                    Login
                                </div>
                            </Link>
                            <Link to="/signup">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                                hover:to-purple-700 px-4 py-2 rounded-md transition-all duration-300 text-white">
                                    Sign Up
                                </div>
                            </Link>
                        </div>
                    }

                    {
                        user &&
                            <div className="flex gap-8 items-center">
                                <div className="text-white">
                                    <Notification />
                                </div>
                                <button onClick={handleLogout}
                                    className="flex cursor-pointer items-center place-content-center gap-3 px-3 text-red-600 p-2 rounded-lg transition-all duration-300">
                                    <FiLogOut />Log Out
                                </button>
                                {
                                    user &&
                                    <button
                                        onClick={() => navigate('/dashboard/my-profile')}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                                        title="Dashboard"
                                    >
                                        <RxDashboard className="w-5 h-5" />
                                        <span className="hidden md:inline">Dashboard</span>
                                    </button>
                                }
                            </div>
                    }
                </div>
            </div>
        </motion.nav>
    )
};


export default Navbar;
