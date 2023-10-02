import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Layout from "./Components/Layout";
import Register from "./Pages/Register";
import TodoList from "./Pages/TodoList";
import axios from "axios";
import { useAuth } from "./hooks/useAuth";
import AuthRoutes from "./Components/AuthRoutes";

function App() {
	const { isLoggedIn, logout } = useAuth();

	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401) logout();
			return Promise.reject(error);
		}
	);

	return (
		<Routes>
			<Route element={<Layout isLoggedIn={isLoggedIn} logout={logout} />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route element={<AuthRoutes isLoggedIn={isLoggedIn} />}>
					<Route path="todos" element={<TodoList />} />
				</Route>
				<Route path="*" element={<h1>Not Found</h1>} />
			</Route>
		</Routes>
	);
}

export default App;
