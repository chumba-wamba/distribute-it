import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Paper } from "@mui/material";
import { TaskModel } from "../utils/models";
import "./TaskCommon.css";

interface CompletedTaskProps {
  task: TaskModel;
}

export const CompletedTask = ({ task }: CompletedTaskProps) => {
  return (
    <Paper className="container flex-container" elevation={6}>
      <div className="row">
        <div className="flex-item">
          <b>{task.name}</b>
        </div>
        <div className="flex-item">Owner: {task.owner}</div>
      </div>
      <div className="row">
        <div className="flex-item">
          Incentive amount: ${task.incentive_amount}
        </div>
        <div className="flex-item">Result: Lorem ipsum</div>
      </div>
    </Paper>
  );
};
