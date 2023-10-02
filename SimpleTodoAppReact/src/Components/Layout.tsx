import { NavLink, Outlet } from "react-router-dom";

interface LayoutProps {
	isLoggedIn: boolean;
	logout: () => void;
}

export default function Layout({ isLoggedIn, logout }: LayoutProps) {
	return (
		<div className="App">
			<header className="py-6 bg-gray-100 shadow">
				<div className="container md:px-2 px-4 mx-auto">
					<nav className="flex gap-4 justify-between">
						<div className="flex gap-4 items-center">
							<NavLink end to="/todos">
								<h2 className="text-xl font-bold">
									<div className="inline-flex items-center justify-center bg-blue-600 w-12 h-6 text-center text-white rounded mr-1">
										STA
									</div>
									SimpleTodoApp
								</h2>
							</NavLink>
						</div>
						{!isLoggedIn && (
							<div className="flex gap-4 items-center">
								<NavLink
									end
									to="/login"
									className={({ isActive }) => {
										return isActive ? "text-blue-600 underline" : "text-blue-600";
									}}
								>
									Login
								</NavLink>

								<NavLink
									end
									to="/register"
									className={({ isActive }) => {
										return isActive ? "text-blue-600 underline" : "text-blue-600";
									}}
								>
									Register
								</NavLink>
							</div>
						)}
						{isLoggedIn && (
							<button onClick={logout} className="text-blue-600">
								Logout
							</button>
						)}
					</nav>
				</div>
			</header>
			<div className="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
				<Outlet />
			</div>
		</div>
	);
}
