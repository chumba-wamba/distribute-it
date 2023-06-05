import { useEffect, useState } from "react";
import { fetchTasksExecutedByCurrentUser } from "../utils/api";
import { getAccessToken } from "../utils/auth";
import Task from "../shared/Task";
import { TaskType } from "../utils/models";

const ExecutedTaskPage = () => {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await fetchTasksExecutedByCurrentUser(getAccessToken());
      console.log(rs);
      setTasks(rs.data.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: "2rem" }}>
      {tasks &&
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              taskId={task.id}
              taskName={task.name}
              description={task.description}
              incentive={task.incentive_amount}
              givenName={task.owner.given_name}
              picture={task.owner.picture}
              fileData={task.file}
              result={task.result}
              executor={task.executor}
              status={task.status}
              taskType={TaskType.EXECUTED}
            ></Task>
          );
        })}
    </div>
  );
};

export default ExecutedTaskPage;
