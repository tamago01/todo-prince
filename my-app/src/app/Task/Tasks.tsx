import React from "react";
import { MdCancel, MdDoneAll } from "react-icons/md";

interface TaskType {
  title: string;
  description: string;
  completed: boolean;
}

interface TaskProps {
  task: TaskType;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  index: number;
  dark: boolean;
}

const Task: React.FC<TaskProps> = ({ task, tasks, setTasks, index, dark }) => {
  const handleTaskUpdate = (updatedTasks: TaskType[]): void => {
    setTasks(updatedTasks);
    localStorage.setItem("myTodoTasks", JSON.stringify(updatedTasks));
  };

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    handleTaskUpdate(updatedTasks);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    handleTaskUpdate(updatedTasks);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-md shadow-md ${
        dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex flex-col flex-grow">
        <div
          className={`text-lg font-semibold mb-1 ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.title}
        </div>
        <div className={`text-sm ${task.completed ? "line-through" : ""}`}>
          {task.description}
        </div>
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4">
        <button
          className={`p-2 rounded-md hover:bg-green-500 ${
            dark ? "bg-green-700 text-white" : "bg-green-200 text-green-900"
          }`}
          onClick={handleComplete}
        >
          <MdDoneAll size={20} />
        </button>
        <button
          className={`p-2 rounded-md hover:bg-red-500 ${
            dark ? "bg-red-700 text-white" : "bg-red-200 text-red-900"
          }`}
          onClick={handleRemove}
        >
          <MdCancel size={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
