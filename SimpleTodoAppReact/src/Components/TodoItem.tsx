import { IconButton, ListItem, ListItemSuffix, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import MenuIcon from "./MenuIcon";
import TrashIcon from "./TrashIcon";
import EditIcon from "./EditIconItem";
import { Todo } from "../types";

interface TodoItemProps {
	todo: Todo;
	handleDestroy: (todo: Todo) => void;
	setTodoBeingUpdated: (todo: Todo) => void;
}

export default function TodoItem({ todo, handleDestroy, setTodoBeingUpdated }: TodoItemProps) {
	return (
		<ListItem key={todo.id} ripple={false} className="py-1 pr-1 pl-4">
			<Typography variant="lead">{todo.description}</Typography>
			<ListItemSuffix>
				<Menu>
					<MenuHandler>
						<IconButton variant="text">
							<MenuIcon />
						</IconButton>
					</MenuHandler>
					<MenuList>
						<MenuItem
							className="flex gap-2 items-center"
							onClick={() => {
								setTodoBeingUpdated(todo);
							}}
						>
							<EditIcon></EditIcon>
							Edit
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleDestroy(todo);
							}}
							className="flex gap-2 items-center"
							color="red"
						>
							<TrashIcon />
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			</ListItemSuffix>
		</ListItem>
	);
}
