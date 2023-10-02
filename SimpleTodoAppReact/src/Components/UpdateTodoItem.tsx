import { IconButton, Input, ListItem, ListItemSuffix } from "@material-tailwind/react";

import { Todo } from "../types";
import AcceptIcon from "./AcceptIcon";
import CancelIcon from "./CancelIcon";
import { useState } from "react";

interface UpdateTodoItemProps {
	todo: Todo;
	handleDescriptionUpdate: (todo: Todo) => void;
	setTodoBeingUpdated: (todo: Todo | null) => void;
}

export default function UpdateTodoItem({ todo, handleDescriptionUpdate, setTodoBeingUpdated }: UpdateTodoItemProps) {
	const [description, setDescription] = useState<string>(todo.description);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};

	const handleUpdate = () => {
		const updatedTodo = {
			...todo,
			description: description,
		};
		handleDescriptionUpdate(updatedTodo);
	};

	const handleCancelUpdate = () => {
		setTodoBeingUpdated(null);
	};

	return (
		<ListItem key={todo.id} ripple={false} className="py-1 pr-1 pl-4">
			<Input crossOrigin="" variant="standard" autoFocus size="lg" label="Change Description" value={description} onChange={handleChange} />
			<ListItemSuffix className="flex">
				<IconButton variant="text" onClick={handleUpdate}>
					<AcceptIcon />
				</IconButton>
				<IconButton variant="text" onClick={handleCancelUpdate}>
					<CancelIcon />
				</IconButton>
			</ListItemSuffix>
		</ListItem>
	);
}
