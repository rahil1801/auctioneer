import { apiConnector } from "../apiConnector";
import { auctionEndpoints, categoryEndpoints } from "../apis";
import toast from "react-hot-toast";

const { CREATE_AUCTION, FETCH_ALL_USER_AUCTIONS, DELETE_AUCTION } = auctionEndpoints;
const { FETCH_ALL_CATEGORY, FETCH_ALL_CATEGORY_POSTS } = categoryEndpoints;

export const createAuction = async (formData, navigate) => {
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", CREATE_AUCTION, formData);

        // console.log("CREATE_AUCTION_API", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Auction Created");
        navigate('/dashboard/my-auctions');
    }
    catch(error){
        console.log("ERROR IN CREATING AUCTION API", error);
        toast.error("Cannot Create Auction");
    }
    toast.dismiss(toastId);
}

export const deleteAuction = async (auctionId) => {
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("DELETE", `${DELETE_AUCTION}/${auctionId}`);

        console.log("RESPONSE", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        // toast.success("Auction Deleted");
        return response;
        toast.dismiss(toastId);
    }
    catch(error){
        console.log("ERROR DELETING AUCTION", error);
        toast.error("Cannot Delete Auction");
    }
}

export const fetchUserAuctions = async () => {
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("GET", FETCH_ALL_USER_AUCTIONS);

        //console.log("RESPONSE FOR FETCH USER AUCTIONS API", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        if(response.data.auctions.length < 0){
            toast.error("No Auctions Posted")
        }
        else{
            toast.success("Auctions Fetched");
            return response.data.auctions
        }
    }
    catch(error){
        console.log("ERROR IN FETCH AUCTIONS API", error);
        toast.error("Cannot fetch Auctions");
        return [];
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const fetchCategories = async () => {
    let result = [];
    try{
        const response = await apiConnector("GET", FETCH_ALL_CATEGORY);
        //console.log("POST CATEGORIES API RESPONSE", response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.categories;
        //console.log("Result", result);
    }
    catch(error){
        //console.log("FETCH POST CATEGORIES API ERROR", error);
        toast.error("Failed to display Category")
    }
    return result;
}