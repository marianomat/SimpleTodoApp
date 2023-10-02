import axios from "axios";
import { Todo } from "../types";

export async function destroyTodo(todo: Todo) {
	axios.delete(`http://localhost:8000/api/v1/todos/${todo.id}`).catch((error) => {
		console.log(error);
	});
}

export async function getTodos(): Promise<Todo[]> {
	return axios
		.get("http://localhost:8000/api/v1/todos")
		.then((response) => response.data.data)
		.catch((error) => {
			console.log(error);
		});
}

export async function updateTodo(todo: Todo): Promise<Todo> {
	return axios
		.put(`http://localhost:8000/api/v1/todos/${todo.id}`, {
			description: todo.description,
			completed: todo.completed,
		})
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function createTodo(description: string): Promise<Todo> {
	return axios
		.post("http://localhost:8000/api/v1/todos", {
			description: description,
		})
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			console.log(error);
		});
}
