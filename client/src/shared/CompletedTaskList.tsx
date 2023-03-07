import { useEffect } from "react";
import { useState } from "react";
import { fetchAllTasks } from "../utils/api";
import { TaskModel, TaskStatus } from "../utils/models";
import { CompletedTask } from "./CompletedTask";

const CompletedTaskList = () => {
  const [tasks, setTasks] = useState<TaskModel[]>();

  useEffect(() => {
    fetchAllTasks().then((response) => {
      setTasks(response.data.data);
    });
  }, []);

  return (
    <>
      {tasks &&
        tasks
          .filter(
            (task) =>
              task.executor === "string" && task.status === TaskStatus.COMPLETE
          )
          .map((task) => (
            <CompletedTask task={task} key={task._id}></CompletedTask>
          ))}
    </>
  );
};

export default CompletedTaskList;
