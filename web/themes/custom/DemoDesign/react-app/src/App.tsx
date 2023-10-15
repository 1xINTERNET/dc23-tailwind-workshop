import { useMemo, useState } from "react";
import "./App.css";
import Task from "./components/task";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App(props: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(props.tasks);

  const updateTasks = (taskId: number, completed: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed };
        }
        return task;
      })
    );
  };

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
    <div className="flex flex-col md:flex-row gap-20 w-full justify-center">
      <div className="flex flex-col my-3 gap-1 w-1/3">
        <span className="text-xl text-brand font-bold">To-Do</span>
        {todoTasks.map((task) => (
          <Task key={"todo" + task.id} {...task} onClick={onTaskClick} />
        ))}
      </div>
      <div className="my-3 border-gray-400/70 border-r" />
      <div className="flex flex-col my-3 gap-1 w-1/3">
        <span className="text-xl text-brand font-bold">Done</span>
        {doneTasks.map((task) => (
          <Task key={"done" + task.id} {...task} onClick={onTaskClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
