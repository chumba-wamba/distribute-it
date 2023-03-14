import { useEffect, useState ,useMemo} from "react";
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

  const runWorker=(task:TaskModel):void=>{
    const worker: Worker = new window.Worker(new URL("./fib-worker.js", import.meta.url))
    const num=20
    worker.postMessage({num})
    worker.onmessage = (e) => {
      console.log(e.data)
    }
    
  }
  useEffect(() => {

    // fetchAllTasks().then((response) => {
    //   setTasks(response.data.data);
    // });
  }, []);
  
  return (
    <>
      {tasks &&
        tasks
          .filter((task) => task.status === TaskStatus.INCOMPLETE)
          .map((task) => <AcceptTask task={task} key={task._id} runWorker={runWorker} ></AcceptTask>)}
    </>
  );
};
