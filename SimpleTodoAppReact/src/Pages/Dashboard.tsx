import { Link } from "react-router-dom";

export default function Dashboard() {
	return (
		<>
			<div>Welcome</div>
			<Link to={"/todos"}>Go to my Todos</Link>
		</>
	);
}
