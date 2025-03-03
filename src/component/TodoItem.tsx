import React from "react";
import { format, isToday } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Button from "./Button";
import { Todo } from "../type/todo";
import "../index.css";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const isCompletionToday = isToday(new Date(todo.completionDate));

  return (
    <div
      className={`bg-white  rounded-lg shadow-md p-4 animate-fade-in ${
        isCompletionToday ? "border-l-10 border-red-500" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1 overflow-hidden">
          <h3
            className={`text-lg font-medium truncate max-w-full ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          <p
            className={`mt-1 text-sm line-clamp-2 ${
              todo.completed ? "line-through text-gray-400" : "text-gray-600"
            }`}
          >
            {todo.description}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <span
              className={`${
                isCompletionToday
                  ? "text-sm text-red-500"
                  : "text-sm text-gray-500"
              }`}
            >
              Due: {format(new Date(todo.completionDate), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onEdit(todo)}
            className="p-2"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
