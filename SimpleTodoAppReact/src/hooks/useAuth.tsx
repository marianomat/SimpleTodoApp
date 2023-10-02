import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

interface LoginData {
	email: string;
	password: string;
}

export function useAuth() {
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

	async function login(data: LoginData) {
		setErrors({});
		setLoading(true);

		return axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
			axios
				.post("/login", data)
				.then(() => {
					setIsLoggedIn(true);
					navigate("/todos");
				})
				.catch((error) => {
					console.log(error);
					if (error.response.status === 422) {
						setErrors(error.response.data.errors);
					}
				})
				.finally(() => setLoading(false));
		});
	}

	async function register(data: RegisterData) {
		setErrors({});
		setLoading(true);
		return axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
			axios
				.post("http://localhost:8000/register/", data)
				.then(() => {
					setIsLoggedIn(true);
					navigate("/todos");
				})
				.catch((error) => {
					if (error.response.status === 422) {
						console.log(error);
						setErrors(error.response.data.errors);
					}
				})
				.finally(() => setLoading(false));
		});
	}

	async function logout() {
		await axios.post("http://localhost:8000/logout");
		setIsLoggedIn(false);
		navigate("/login");
	}

	return { register, errors, loading, logout, isLoggedIn, login, setIsLoggedIn };
}
