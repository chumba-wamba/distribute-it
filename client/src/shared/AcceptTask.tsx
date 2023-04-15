import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Paper } from "@mui/material";
import { TaskModel } from "../utils/models";
import "./TaskCommon.css";

interface AcceptTaskProps {
  task: TaskModel;
  runWorker(task: TaskModel): void;
}

export const AcceptTask = ({ task, runWorker }: AcceptTaskProps) => {
  const handleWorker = () => {
    runWorker(task);
  };

  return (
    <Paper className="container flex-container" elevation={6}>
      <div className="row">
        <div className="flex-item">
          <b>{task.name}</b>
        </div>
        <div className="flex-item">Description: {task.description}</div>
      </div>
      <div className="row">
        <div className="flex-item">
          Incentive amount: ${task.incentive_amount}
        </div>
        <div className="flex-item">
          <IconButton color="primary" component="label">
            <DoneIcon onClick={handleWorker} />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};
