import { useEffect } from "react";
import { useState } from "react";
import { fetchAllTasks } from "../utils/api";
import { TaskModel, TaskStatus } from "../utils/models";
import { CreatedTask } from "./CreatedTask";

const CreatedTaskList = () => {
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
          .filter((task) => task.owner === "string")
          .map((task) => (
            <CreatedTask task={task} key={task._id}></CreatedTask>
          ))}
    </>
  );
};

export default CreatedTaskList;
