import { useEffect, useState } from "react";
import { fetchAllTasks } from "../utils/api";
import { TaskModel, TaskStatus } from "../utils/models";
import { AcceptTask } from "./AcceptTask";

export const AcceptTaskList = () => {
  const [tasks, setTasks] = useState<TaskModel[]>();

  useEffect(() => {
    fetchAllTasks().then((response) => {
      console.log(response.data);
      setTasks(response.data.data);
    });
  }, []);

  return (
    <>
      {tasks &&
        tasks
          .filter((task) => task.status === TaskStatus.INCOMPLETE)
          .map((task) => <AcceptTask task={task} key={task._id}></AcceptTask>)}
    </>
  );
};
