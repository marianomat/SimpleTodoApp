import { Navigate, Outlet } from "react-router-dom";

interface AuthRoutesProps {
	isLoggedIn: boolean;
}

const AuthRoutes = ({ isLoggedIn }: AuthRoutesProps) => {
	return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoutes;
