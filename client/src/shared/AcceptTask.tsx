import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Paper } from "@mui/material";
import { TaskModel } from "../utils/models";
import "./TaskCommon.css";

interface AcceptTaskProps {
  task: TaskModel;
}

export const AcceptTask = ({ task }: AcceptTaskProps) => {
  const saveByteArray = (fileName: string, fileContent: string) => {
    const blob = new Blob([fileContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
          <IconButton
            color="primary"
            component="label"
            onClick={() => saveByteArray("Worker", task.file)}
          >
            <DoneIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};
