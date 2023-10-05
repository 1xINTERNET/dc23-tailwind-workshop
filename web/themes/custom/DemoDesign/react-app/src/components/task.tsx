import { createRef, useEffect } from "react";

const Task = (task: {
  id: number;
  title: string;
  completed: boolean;
  onClick: (id: number, newCompleted:boolean) => void;
}) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("task-click", (e) => task.onClick(task.id, (e as CustomEvent).detail));
    }
  }, [ref, task]);

  return (
    <dc-task
      ref={ref}
      key={task.id}
      title={task.title}
      completed={task.completed ? "true" : undefined}
    />
  );
};

export default Task;
