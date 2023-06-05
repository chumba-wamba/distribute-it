import { useEffect, useState, useMemo } from "react";
import { fetchAllTasks } from "../utils/api";
import { TaskModel, TaskStatus } from "../utils/models";
import { AcceptTask } from "./AcceptTask";

export const AcceptTaskList = () => {
  // const dummyTask={
  //   _id: "Dummy",
  //   name: "Dummy",
  //   incentive_amount: 1,
  //   description:"Dummy",
  //   owner: "Dummy",
  //   executor: "Dummy",
  //   status: TaskStatus.INCOMPLETE
  // }

  const [tasks, setTasks] = useState<TaskModel[]>();

  const runWorker = (): void => {
    // const worker: Worker = new window.Worker(
    //   new URL("../workerFolder/fib-worker.js", import.meta.url)
    // );
    const text = "const x = 42; console.log(x);";
    const blob = new Blob([text], { type: "text/javascript" });
    const file = new File([blob], "test.js");
    const worker: Worker = new window.Worker(URL.createObjectURL(file));
    const num = 42;
    worker.postMessage({ num });
    worker.onmessage = (e) => {
      console.log(e.data);
    };
  };
  useEffect(() => {
    fetchAllTasks().then((response) => {
      console.log(response);
      setTasks(response.data.data);
    });
  }, []);

  return (
    <>
      <button onClick={runWorker}>fds</button>

      {tasks &&
        tasks
          .filter((task) => task.status === TaskStatus.INCOMPLETE)
          .map((task) => (
            <AcceptTask
              task={task}
              key={task._id}
              runWorker={runWorker}
            ></AcceptTask>
          ))}
    </>
  );
};
