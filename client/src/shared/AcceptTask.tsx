import "./AcceptTask.css";
import { IconButton, Paper } from "@mui/material";
import { TaskModel } from "../utils/models";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";

interface AcceptTaskProps {
  task: TaskModel;
}

export const AcceptTask = ({ task }: AcceptTaskProps) => {
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
            <DoneIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};
