const BASE_URL = "http://localhost:4000/api/v1";

export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGOUT_API: BASE_URL + "/auth/logout"
};

export const auctionEndpoints = {
    CREATE_AUCTION: BASE_URL + "/auction/createAuction",
    FETCH_ALL_USER_AUCTIONS: BASE_URL + "/auction/getAuctions",
    DELETE_AUCTION: BASE_URL + "/auction/deleteAuction",
}

export const categoryEndpoints = {
    FETCH_ALL_CATEGORY: BASE_URL + "/auction/getAllCategories",
    FETCH_ALL_CATEGORY_POSTS: BASE_URL + "/auction/getAllCategoryPosts"
}