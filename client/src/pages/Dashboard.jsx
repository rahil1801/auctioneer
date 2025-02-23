import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return(
        <div className="flex w-full h-[500px] text-[2.5rem] items-center">
            <div className="w-full">
            <div className="relative flex flex-col xl:flex-row gap-5 w-full h-full p-3 xl:p-14 items-center">
                <div className="w-full shadow-lg xl:flex-1 h-full rounded-2xl overflow-y-auto">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default Dashboard;