import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log("User:", user);

    if(user !== null){
        return children;
    }
    else{
        return <Navigate to="/login" />
    }
};

export default PrivateRoute;