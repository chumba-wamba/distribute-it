import { useEffect, useState } from "react";
import { fetchTasksUploadedByCurrentUser } from "../utils/api";
import { getAccessToken } from "../utils/auth";
import Task from "../shared/Task";
import { Status, TaskType } from "../utils/models";

const UploadedTaskPage = () => {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await fetchTasksUploadedByCurrentUser(getAccessToken());
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
              taskType={TaskType.UPLOADED}
            ></Task>
          );
        })}
    </div>
  );
};

export default UploadedTaskPage;
