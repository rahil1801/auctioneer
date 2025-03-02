import { useSelector } from "react-redux";
import { useLocation, matchPath, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiAuctionLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { LuHistory } from "react-icons/lu";

const url = "http://localhost:4000";

const Sidebar = () => {

    const location = useLocation();

    const {user} = useSelector((state) => state.profile);

    const sidebarLinks = [
        {
            id:1,
            name:"My profile",
            path:"/dashboard/my-profile",
            icon: <CgProfile />
        },
        {
            id:2,
            name:"My Auctions",
            path:"/dashboard/my-auctions",
            icon:<RiAuctionLine />
        },
        {
            id:3,
            name:"Create Auction",
            path:"/dashboard/create-auction",
            icon:<FiPlus />
        },
        {
            id:4,
            name:"Auctions won",
            path:"/dashboard/auctions-won",
            icon:<HiOutlineTrophy />
        },
        {
            id:5,
            name:"History",
            path:"/dashboard/history",
            icon:<LuHistory />
        }
    ];

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    return(
        <div className="w-fit xl:w-2/10 h-auto bg-white shadow-lg rounded-2xl p-4 relative z-10">
            <div className="flex items-center gap-4 m-4">
                <img src={`${url}${user?.image}`} alt="user-img" className="w-[50px] object-cover aspect-square rounded-2xl" loading="lazy"/>

                <div>
                    <h1 className="font-medium text-lg">Welcome! {user?.name}</h1>
                    <p className="text-sm text-gray-400 font-medium">{user?.email}</p>
                </div>
            </div>
            <div className="flex justify-center flex-wrap flex-row xl:flex-col">
                {
                    sidebarLinks.map((link) => {
                        return(
                            <NavLink
                                to={link.path}
                                //onClick={}
                                className={`relative py-4 px-4 xl:px-0 xl:py-4 text-sm font-medium m-2 xl:m-4 rounded-lg 
                                ${matchRoute(link.path) ? "bg-[#F8EDE3]" : "bg-opacity-0"}`}
                            >
                                {/* <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-[#3A7E8D]
                                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
                                </span> */}

                                <div className="flex items-center gap-5 px-4 text-lg">
                                    {/* <Icon className="text-lg" /> */}
                                    <span>{link.icon}</span>
                                    <span>{link.name}</span>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Sidebar;