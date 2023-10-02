import { useEffect, useState } from "react";
import { Todo } from "../types";
import { createTodo, destroyTodo, getTodos, updateTodo } from "../Services/TodoService";
import { Card, List } from "@material-tailwind/react";
import TodoItem from "../Components/TodoItem";
import UpdateTodoItem from "../Components/UpdateTodoItem";
import LoadingItem from "../Components/LoadingItem";
import CreateTodo from "../Components/CreateTodo";
import toast from "react-hot-toast";

export default function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [todoBeingUpdated, setTodoBeingUpdated] = useState<Todo | null>(null);
	const [loadingTodoChange, setLoadingTodoChange] = useState<number | null>();
	const [creatingTodo, setCreatingTodo] = useState<boolean>(false);

	useEffect(() => {
		getTodos().then((res) => setTodos(res));
	}, []);

	const handleDestroy = (todo: Todo) => {
		setLoadingTodoChange(todo.id);
		destroyTodo(todo);
		getTodos()
			.then((res) => setTodos(res))
			.catch(() => {
				toast.error("Error deleting Todo");
			})
			.finally(() => {
				toast.success("Todo deleted successfully!");
				setLoadingTodoChange(null);
			});
	};

	const handleDescriptionUpdate = (todo: Todo) => {
		setLoadingTodoChange(todo.id);
		setTodoBeingUpdated(null);
		updateTodo(todo)
			.then(() => getTodos().then((res) => setTodos(res)))
			.catch(() => {
				toast.error("Error updating Todo");
			})
			.finally(() => {
				toast.success("Todo updated successfully!");
				setLoadingTodoChange(null);
			});
	};

	const handleTodoCreation = (description: string) => {
		setCreatingTodo(true);
		createTodo(description)
			.then(() => getTodos().then((res) => setTodos(res)))
			.catch(() => {
				toast.error("Error creating Todo");
			})
			.finally(() => {
				toast.success("Todo created successfully!");
				setCreatingTodo(false);
			});
	};

	const generateTodoList = () => {
		return (
			<List>
				{todos.length > 0 &&
					todos.map((todo: Todo) => {
						if (loadingTodoChange === todo.id) {
							return <LoadingItem key={todo.id} todo={todo} />;
						}
						if (todoBeingUpdated?.id === todo.id) {
							return generateEditTodoItem(todo);
						} else {
							return generateTodoItem(todo);
						}
					})}
			</List>
		);
	};

	const generateEditTodoItem = (todo: Todo) => {
		return (
			<UpdateTodoItem key={todo.id} todo={todo} setTodoBeingUpdated={setTodoBeingUpdated} handleDescriptionUpdate={handleDescriptionUpdate} />
		);
	};

	const generateTodoItem = (todo: Todo) => {
		return <TodoItem key={todo.id} todo={todo} handleDestroy={handleDestroy} setTodoBeingUpdated={setTodoBeingUpdated} />;
	};

	return (
		<>
			<div className="flex flex-col mx-auto md:w-1/2 w-full">
				<h1 className="heading">My Todos</h1>
				<div className="flex flex-col gap-2">
					<Card className="w-full">
						<CreateTodo handleTodoCreation={handleTodoCreation} creatingTodo={creatingTodo} />
						<h2 className="heading mt-8">List of Todos</h2>
						<List>{generateTodoList()}</List>
					</Card>
				</div>
			</div>
		</>
	);
}
