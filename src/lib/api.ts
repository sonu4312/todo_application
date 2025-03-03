import axios from "axios";
import { Todo } from "../type/todo";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
});

export const getTodos = async () => {
  const response = await api.get<Todo[]>("/todos");
  return response.data;
};

export const createTodos = async (
  todo: Omit<Todo, "id" | "completed" | "createdAt">
) => {
  const response = await api.post<Todo>("/todos", {
    ...todo,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  console.log("Created Todo ", todo);
  console.log("Response of creation : ", response);

  return response.data;
};

export const updateTodo = async (id: number, todo: Partial<Todo>) => {
  const response = await api.patch<Todo>(`/todos/${id}`, todo);
  console.log("Updated Todo with id : ", id, "todo : ", todo);

  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await api.delete<Todo>(`/todos/${id}`);
  console.log("Delete: from api, ", id);

  return response.data;
};
