import { ListItem } from "@material-tailwind/react";
import { Todo } from "../types";
import ListIconSpinner from "./ListIconSpinner";

interface LoadingItemProps {
	todo: Todo;
}

export default function LoadingItem({ todo }: LoadingItemProps) {
	return (
		<ListItem key={todo.id} ripple={false} className="py-1 pr-1 pl-4 flex justify-center">
			<ListIconSpinner />
		</ListItem>
	);
}
