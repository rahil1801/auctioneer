import { useEffect, useState } from "react";
import { deleteAuction, fetchUserAuctions } from '../../../services/operations/auctionAPI';
import EmptyLoader from '../../EmptyLoader';
import { formatDate } from "../../../services/formatDate";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEditSolid } from "react-icons/lia";
import toast from 'react-hot-toast';

const url = "http://localhost:4000";

const MyAuctions = () => {

    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await fetchUserAuctions();
            setAuctions(response);
        }
        fetchAuctions();
    },[]);

    const handleRemove = async (auctionId) => {
        try{
           const response = await deleteAuction(auctionId);
           if(response && response.data.success){
                toast.success("Auction Deleted");

                setAuctions((prevAuctions) => prevAuctions.filter(auction => auction._id !== auctionId));   
           }
        }
        catch(error){
            //toast.error("Cannot Delete Auction");
            console.log(error);
        }
    }

    //console.log("AUCTIONS", auctions);

    return(
        <div className="flex items-center flex-col w-full min-h-[575px] overflow-y-auto bg-white text-3xl p-10">
            <h1 className="bg-[#F2EFE7] w-full px-8 py-6 rounded-4xl text-center 
            font-sans uppercase font-bold text-6xl">My Auctions</h1>

            <div className="flex flex-col gap-4 w-full">
                {
                    auctions.length <= 0 ? (
                        <div className="flex flex-col items-center mt-20 justify-center self-center 
                        bg-white rounded-xl p-10 shadow-md w-fit">
                            <EmptyLoader />
                            <p className="text-2xl">No Auctions Posted Yet!!</p>
                        </div>
                    ) : (
                        auctions.map((auction, index) => {
                            return(
                                <div key={index} className={`w-full justify-between flex py-2 rounded-xl px-2 mt-10 

                                ${auction.status == "Live" ? "bg-green-200" : "bg-red-200"}`}>
                                    <div className="flex gap-5 items-center">
                                        <img src={`${url}${auction?.images}`} alt="user-img" className="w-[200px] object-cover 
                                            aspect-square rounded-2xl border-4 border-green-400" loading="lazy"/>
                                        <div className="flex flex-col gap-1">
                                            <h1 className="text-3xl font-sans font-bold">{auction.title}</h1>
                                            <p className="text-lg font-medium mt-2">{auction.description}</p>
                                            <p className="mt-2 text-lg font-bold bg-white rounded-full px-5 py-1 w-fit">${auction.startingPrice}</p>
                                            <p className="bg-red-500 text-white px-5 py-1 w-fit text-lg mt-2 rounded-lg font-medium">Ending Date: {formatDate(auction.auctionEndTime)}</p>
                                        </div>
                                    </div>

                                    <div className="px-6 py-3 flex flex-col justify-between items-end">
                                        <p className="text-white bg-green-500 rounded-xl py-2 px-5 w-fit text-base">{auction.status}</p>
                                        <div className="flex gap-2">
                                            <button className="bg-blue-500 text-white p-3 rounded-lg text-lg cursor-pointer">
                                                <LiaEditSolid />
                                            </button>

                                            <button onClick={() => handleRemove(auction._id)}
                                                className="bg-red-500 text-white p-3 rounded-lg text-lg cursor-pointer">
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
};

export default MyAuctions;