import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
