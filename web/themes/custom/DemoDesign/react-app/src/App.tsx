import { useMemo, useState } from "react";
import "./App.css";
import Task from "./components/task";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TASKS: Task[] = [
  {
    id: 1,
    title: "Register",
    completed: false,
  },
  {
    id: 2,
    title: "Book a flight",
    completed: false,
  },
  {
    id: 3,
    title: "Book a hotel",
    completed: false,
  },
  {
    id: 4,
    title: "Check the schedule",
    completed: false,
  },
  {
    id: 5,
    title: "Note down your favorite sessions",
    completed: false,
  },
  {
    id: 6,
    title: "Meet in Lille",
    completed: false,
  },
  {
    id: 7,
    title: "Attend this talk",
    completed: false,
  },
  {
    id: 8,
    title: "Ask questions!",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(TASKS);

  const updateTasks = (taskId: number, completed: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed };
        }
        return task;
      })
    );
  }


  const onTaskClick = (taskId: number, newCompleted: boolean) => {
    updateTasks(taskId, newCompleted);
  };

  const [todoTasks, doneTasks] = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (task.completed) {
          acc[1].push(task);
        } else {
          acc[0].push(task);
        }
        return acc;
      },
      [[], []] as [Task[], Task[]]
    );
  }, [tasks]);

  return (
    <>
      <div className="flex-col my-3">
        <span className="text-xl">Todo</span>
        {todoTasks.map((task) => (
          <Task key={"todo"+task.id} {...task} onClick={onTaskClick} />
        ))}
      </div>
      <hr className="my-3 border-gray-300" />
      <div className="flex-col my-3">
        <span className="text-xl">Done</span>
        {doneTasks.map((task) => (
          <Task key={"done"+task.id} {...task} onClick={onTaskClick} />
        ))}
      </div>
    </>
  );
}

export default App;
