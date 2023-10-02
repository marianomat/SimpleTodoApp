import { useEffect, useState } from "react";
import { Todo } from "../types";
import { destroyTodo, getTodos, updateTodo } from "../Services/TodoService";
import { Card, List } from "@material-tailwind/react";
import TodoItem from "../Components/TodoItem";
import UpdateTodoItem from "../Components/UpdateTodoItem";
import LoadingItem from "../Components/LoadingItem";

export default function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [todoBeingUpdated, setTodoBeingUpdated] = useState<Todo | null>(null);
	const [loadingTodoChange, setLoadingTodoChange] = useState<number | null>();

	useEffect(() => {
		getTodos().then((res) => setTodos(res));
	}, []);

	const handleDestroy = (todo: Todo) => {
		setLoadingTodoChange(todo.id);
		destroyTodo(todo);
		getTodos()
			.then((res) => setTodos(res))
			.finally(() => setLoadingTodoChange(null));
	};

	const handleDescriptionUpdate = (todo: Todo) => {
		setLoadingTodoChange(todo.id);
		setTodoBeingUpdated(null);
		updateTodo(todo)
			.then(() => getTodos().then((res) => setTodos(res)))
			.finally(() => setLoadingTodoChange(null));
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
				<h1 className="heading">Todos</h1>
				<div className="flex flex-col gap-2">
					<Card className="w-full">
						<List>{generateTodoList()}</List>
					</Card>
				</div>
			</div>
		</>
	);
}
