import { useState } from "react";
import Button from "./component/Button";
import CustomModal, { TodoFormData } from "./component/CustomModal";
import ListBox from "./component/ListBox";
import ThemeSwitcher from "./component/ThemeSwitcher";
import { Plus } from "lucide-react";
import { Todo, TodoStatus } from "./type/todo";
import TodoItem from "./component/TodoItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodos, deleteTodo, getTodos, updateTodo } from "./lib/api";
import { compareAsc } from "date-fns";

function App() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<TodoStatus>("all");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { data: todos = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const filteredTodos = todos
    .filter((todo) => {
      if (filterStatus === "completed") return todo.completed;
      if (filterStatus === "pending") return !todo.completed;
      return true;
    })
    .sort((a, b) =>
      compareAsc(new Date(a.completionDate), new Date(b.completionDate))
    );

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedTodo(null), 300); // Delay reset to avoid flicker
  };

  const createTodoMutate = useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const updateTodoMutate = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: Partial<Todo> }) =>
      updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteMutate = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggleComplete = (id: number) => {
    const todo = todos.find((td) => td.id === id);
    if (todo) {
      updateTodoMutate.mutate({
        id,
        todo: { completed: !todo.completed },
      });
    }
  };

  const handleAddTodo = (data: TodoFormData) => {
    createTodoMutate.mutate(data);
  };
  const handleEditTodo = (data: TodoFormData) => {
    if (selectedTodo) {
      updateTodoMutate.mutate({
        id: selectedTodo.id,
        todo: data,
      });
    }
  };
  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };
  const handleDelete = (id: number) => {
    deleteMutate.mutate(id);
  };

  // const currentDay = new Date().toISOString().split("T")[0];
  return (
    <div className="min-h-screen bg-primary/15 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-primary text-center mb-8">
          Todo Application
        </h1>
        <div className="flex justify-between items-center mb-6 gap-4">
          <Button
            onClick={() => {
              setSelectedTodo(null);
              setModalOpen(true);
            }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Todo
          </Button>
          <ListBox
            value={filterStatus}
            onChange={(value) => setFilterStatus(value as TodoStatus)}
            options={[
              { value: "all", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
            ]}
            className="w-40"
          />
        </div>
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <CustomModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          mode={selectedTodo ? "edit" : "add"}
          onSubmit={selectedTodo ? handleEditTodo : handleAddTodo}
          initialData={
            selectedTodo
              ? {
                  title: selectedTodo.title,
                  description: selectedTodo.description,
                  completionDate: selectedTodo.completionDate,
                }
              : undefined
          }
        />
        <div className="fixed bottom-4 right-20">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default App;
