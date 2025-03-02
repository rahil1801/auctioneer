import { TbHomeFilled } from "react-icons/tb";
import { RiAuctionFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from "../../slices/profileSlice";

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    const navbarLinks = [
        {
            id:1,
            name: "Home",
            path: '/',
            icon:<TbHomeFilled />
        },
        {
            id:2,
            name:"About",
            path:"/about",
            icon:<HiMiniUsers />
        },
        {
            id:3,
            name:"Auctions",
            path:"/auctions",
            icon:<RiAuctionFill />
        },
        {
            id:4,
            name:"Contact",
            path:"/contact",
            icon:<IoMdContact />
        }
    ];

    const handleLogout = async () => {
        await fetch("http://localhost:4000/api/v1/auth/logout", {
            method:"POST",
            credentials: "include"
        });

        dispatch(setUser(null));
        localStorage.removeItem('user');
        toast.success("Logged Out");
        navigate('/');
    }

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <div className="w-full bg-white rounded-3xl h-20 shadow-md px-10 py-4 flex justify-between items-center">
            <h1 className="font-serif text-2xl">AUCTIONEER</h1>
            
            <div className="flex items-center gap-8">
                {
                    navbarLinks.map((link, index) => {
                        return(
                            <Link className={`flex items-center gap-3 text-lg px-6 py-2 rounded-lg
                            transition-all duration-300 ${matchRoute(link.path) ? "bg-blue-200 text-[#2973B2]" : "text-gray-400"}`} 
                            to={link.path}>
                                {link.icon}
                                <h1>{link.name}</h1>
                            </Link>
                        )
                    })
                }
            </div>
            
            {
                !user &&

                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <button  className="bg-[#2973B2] text-white font-semibold cursor-pointer
                        px-5 py-2 rounded-md transition-all duration-300">
                            Log In
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button className="font-semibold text-white bg-[#2973B2] cursor-pointer
                        px-5 py-2 rounded-md transition-all duration-300">
                            Sign Up
                        </button>
                    </Link>
                </div>
            }

            {
                user && 

                <div className="flex items-center gap-4">
                    <button className="font-semibold text-white bg-red-500 cursor-pointer
                    px-2 py-2 rounded-md transition-all duration-300 flex items-center gap-3"
                    onClick={handleLogout}>
                        <TbLogout2  fontSize={24}/>
                    </button>

                    <Link to="dashboard/my-profile">
                        <button className="font-semibold text-white bg-[#2973B2] cursor-pointer
                        px-5 py-2 rounded-md transition-all duration-300 flex items-center gap-3">
                            <CgProfile />
                            Profile
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
};

export default Navbar;