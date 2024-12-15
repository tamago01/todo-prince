"use client";
import React, { useState } from "react";
import Task from "./Tasks";

interface TaskType {
  completed: boolean;
  title: string;
  description: string;
}

interface TaskContainerProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  dark: boolean;
}

const TaskContainer: React.FC<TaskContainerProps> = ({
  tasks,
  setTasks,
  dark,
}) => {
  const [todo, setTodo] = useState<TaskType>({
    completed: false,
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.title) {
      try {
        setIsLoading(true);
        const newTask: TaskType = { ...todo };
        const newTasks = [...tasks, newTask];

        setTasks(newTasks);
        setTodo({ title: "", description: "", completed: false });

        localStorage.setItem("myTodoTasks", JSON.stringify(newTasks));
      } catch (error) {
        console.error("Failed to add task", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto max-w-xl space-y-6 p-4">
      <form
        className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          name="title"
          placeholder="Enter Title"
          type="text"
          onChange={handleChange}
          value={todo.title}
          required
        />
        <input
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Enter Description"
          name="description"
          type="text"
          onChange={handleChange}
          value={todo.description}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`${
            dark
              ? "bg-gray-700"
              : "bg-gradient-to-r from-blue-600 to-purple-600"
          } w-full py-3 px-6 rounded-full shadow-lg text-white font-bold transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-5 w-5 mr-3 text-white"
              >
                <circle
                  strokeWidth="4"
                  stroke="currentColor"
                  r="10"
                  cy="12"
                  cx="12"
                  className="opacity-25"
                ></circle>
                <path
                  d="M4 12a8 8 0 018-8v8H4z"
                  fill="currentColor"
                  className="opacity-75"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            "Add Task"
          )}
        </button>
      </form>

      <div
        className={`rounded-lg shadow-md ${
          dark ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        {tasks?.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        ) : (
          tasks.map((task, i) => (
            <Task
              key={i}
              index={i}
              task={task}
              setTasks={setTasks}
              tasks={tasks}
              dark={dark}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskContainer;
