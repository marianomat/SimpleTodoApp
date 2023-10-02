import { useEffect, useState } from "react";
import { Todo } from "../types";
import { destroyTodo, getTodos } from "../Services/TodoService";

export default function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		getTodos().then((res) => setTodos(res));
	}, []);

	const handleDestroy = (todo: Todo) => {
		destroyTodo(todo);
		getTodos().then((res) => setTodos(res));
	};

	return (
		<div className="flex flex-col mx-auto md:w-96 w-full">
			<h1 className="heading">Todos</h1>

			<div className="border-t h-[1px] my-6"></div>

			<div className="flex flex-col gap-2">
				{todos.length > 0 &&
					todos.map((todo: Todo) => {
						return (
							<div key={todo.id} className="flex bg-gray-100 w-full p-2 justify-between">
								<div className="flex items-center overflow-hidden w-full">
									<div className="font-normal text-gray-600 pl-2 grow truncate">{todo.description}</div>
								</div>
								<div className="flex gap-1">
									<button type="button" className="btn btn-secondary text-sm">
										Edit
									</button>
									<button
										onClick={() => {
											handleDestroy(todo);
										}}
										type="button"
										className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
									>
										X
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
