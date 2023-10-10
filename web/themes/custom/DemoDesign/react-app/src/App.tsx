import { useMemo, useState } from "react";
import "./App.css";
import Task from "./components/task";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App(props:{tasks:Task[]}) {
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
