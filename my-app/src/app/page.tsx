"use client";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import TaskContainer from "./Task/TaskContainer";

interface TaskType {
  completed: boolean;
  title: string;
  description: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const tasksFromStorage = localStorage.getItem("myTodoTasks");
    if (tasksFromStorage) {
      setTasks(JSON.parse(tasksFromStorage));
    }
  }, []);

  return (
    <div
      className={`h-screen w-full ${
        dark ? "bg-gray-900 text-white" : "bg-green-200 text-gray-800"
      } py-14`}
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl font-bold">Todo App</h1>
          {/* 
          <Switch
          
            checked={dark}
            onChange={() => setDark(!dark)}
            uncheckedIcon={
              <>
                <BsSunFill size={20} className="mt-1 mx-2" />
              </>
            }
            checkedIcon={
              <>
                <BsFillMoonStarsFill size={20} className="mt-1 mx-2" />
              </>
            }
          /> */}
        </div>

        <TaskContainer tasks={tasks} setTasks={setTasks} dark={dark} />
      </div>
    </div>
  );
}
