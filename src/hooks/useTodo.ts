import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodos, deleteTodo, getTodos, updateTodo } from "../lib/api";
import { Todo } from "../type/todo";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const { data: todos = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const createTodoMutate = useMutation({
    mutationFn: createTodos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodoMutate = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: Partial<Todo> }) =>
      updateTodo(id, todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutate = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleToggleComplete = (id: number) => {
    const todo = todos.find((td) => td.id === id);
    if (todo) {
      updateTodoMutate.mutate({ id, todo: { completed: !todo.completed } });
    }
  };

  return {
    todos,
    createTodo: createTodoMutate.mutate,
    updateTodo: updateTodoMutate.mutate,
    deleteTodo: deleteMutate.mutate,
    handleToggleComplete,
  };
};
