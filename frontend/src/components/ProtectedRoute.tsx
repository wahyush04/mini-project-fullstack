import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const userDataString = localStorage.getItem("user");
    let userData: { token?: string } = {};

    if (userDataString) {
        try {
            userData = JSON.parse(userDataString);
        } catch (error) {
            console.error("Error parsing user data from localStorage", error);
        }
    } else {
        console.log("No user data found in localStorage");
    }

    if (!userData.token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

