import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ValidationError from "../Components/ValidationError";
import IconSpinner from "../Components/IconSpinner";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, errors, loading } = useAuth();

	const handleSubmit = async (evt: React.ChangeEvent<HTMLFormElement>) => {
		evt.preventDefault();

		await login({ email, password });

		setPassword("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col mx-auto md:w-96 w-full">
				<h1 className="heading">Login</h1>
				<div className="flex flex-col gap-2 mb-4">
					<label htmlFor="email" className="required">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="text"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="form-input"
						autoComplete="email"
						disabled={loading}
					/>
					<ValidationError errors={errors} field="email" />
				</div>

				<div className="flex flex-col gap-2 mb-4">
					<label htmlFor="password" className="required">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="form-input"
						autoComplete="current-password"
						disabled={loading}
					/>
					<ValidationError errors={errors} field="password" />
				</div>

				<div className="border-t h-[1px] my-6"></div>

				<div className="flex flex-col gap-2 mb-4">
					<button type="submit" className="btn btn-primary" disabled={loading}>
						{loading && <IconSpinner />}
						Login
					</button>
				</div>
			</div>
		</form>
	);
}

export default Login;
