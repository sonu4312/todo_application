import { useState } from "react";
import Button from "./component/Button";
import CustomModal, { TodoFormData } from "./component/CustomModal";
import ListBox from "./component/ListBox";
import ThemeSwitcher from "./component/ThemeSwitcher";
import { Plus } from "lucide-react";
import { Todo, TodoStatus } from "./type/todo";
import TodoItem from "./component/TodoItem";
import { useTodos } from "./hooks/useTodo";
import { compareAsc } from "date-fns";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<TodoStatus>("all");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { todos, createTodo, updateTodo, deleteTodo, handleToggleComplete } =
    useTodos();

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedTodo(null), 300);
  };

  const handleAddTodo = (data: TodoFormData) => createTodo(data);

  const handleEditTodo = (data: TodoFormData) => {
    if (selectedTodo) {
      updateTodo({ id: selectedTodo.id, todo: data });
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filterStatus === "completed") return todo.completed;
      if (filterStatus === "pending") return !todo.completed;
      return true;
    })
    .sort((a, b) =>
      compareAsc(new Date(a.completionDate), new Date(b.completionDate))
    );

  return (
    <div className="min-h-screen bg-primary/15 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-primary text-center mb-8">
          Todo Application
        </h1>
        <div className="flex justify-between items-center mb-6 gap-4">
          <Button onClick={() => setModalOpen(true)}>
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
              onEdit={(todo) => {
                setSelectedTodo(todo);
                setModalOpen(true);
              }}
              onDelete={deleteTodo}
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
