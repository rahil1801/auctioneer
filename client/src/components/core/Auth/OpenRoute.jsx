import { Navigate } from "react-router-dom";

const OpenRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if(user === null){
        return children;
    }
    else{
        return <Navigate to="/dashboard/my-profile" />
    }
}

export default OpenRoute;