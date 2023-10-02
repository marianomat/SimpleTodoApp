import axios from "axios";
import { Todo } from "../types";

export async function destroyTodo(todo: Todo) {
	axios.delete(`http://localhost:8000/api/v1/todos/${todo.id}`);
}

export async function getTodos(): Promise<Todo[]> {
	return axios.get("http://localhost:8000/api/v1/todos").then((response) => response.data.data);
}
