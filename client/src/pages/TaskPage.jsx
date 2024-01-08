import { useEffect } from "react";
import TaskCard from "../components/TaskCard.jsx";
import { useTasks } from "../context/TaskProvider.jsx";

function TaskPage() {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length == 0) return <h1>No task yet</h1>;

    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center">Task</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  );
}

export default TaskPage;
