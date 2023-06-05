import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Paper } from "@mui/material";
import { TaskModel } from "../utils/models";
import "./TaskCommon.css";

interface CreatedTaskProps {
  task: TaskModel;
}

export const CreatedTask = ({ task }: CreatedTaskProps) => {
  return (
    <Paper className="container flex-container" elevation={6}>
      <div className="row">
        <div className="flex-item">
          <b>{task.name}</b>
        </div>
        <div className="flex-item">Status: {task.status}</div>
      </div>
      <div className="row">
        <div className="flex-item">
          Incentive amount: ${task.incentive_amount}
        </div>
        <div className="flex-item">
          <IconButton color="primary" component="label">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};
