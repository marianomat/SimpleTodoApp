import { IconButton, ListItem, ListItemSuffix, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import MenuIcon from "./MenuIcon";
import TrashIcon from "./TrashIcon";
import EditIcon from "./EditIconItem";
import { Todo } from "../types";

interface TodoItemProps {
	todo: Todo;
	handleDestroy: (todo: Todo) => void;
	setTodoBeingUpdated: (todo: Todo) => void;
	handleCompleteUpdate: (todo: Todo) => void;
}

export default function TodoItem({ todo, handleDestroy, setTodoBeingUpdated, handleCompleteUpdate }: TodoItemProps) {
	return (
		<ListItem
			onClick={() => handleCompleteUpdate(todo)}
			key={todo.id}
			ripple={false}
			className={`py-1 pr-1 pl-4 ${todo.completed && "bg-lime-100"}`}
		>
			<Typography variant="lead">
				<span className={todo.completed ? "line-through" : ""}>{todo.description}</span>{" "}
				{todo.completed && <span className="italic text-gray-500">(Completed)</span>}
			</Typography>
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
							onClick={(e) => {
								e.stopPropagation();
								setTodoBeingUpdated(todo);
							}}
						>
							<EditIcon></EditIcon>
							Edit
						</MenuItem>
						<MenuItem
							onClick={(e) => {
								e.stopPropagation();
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
