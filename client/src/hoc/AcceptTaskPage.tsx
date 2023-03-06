import { AcceptTaskList } from "../shared/AcceptTaskList";
import { Paper } from "@mui/material";
import "./AcceptTaskPage.css";
import { FixedLayout } from "../shared/FixedLayout";

export const AcceptTaskPage = () => {
  return (
    <FixedLayout>
      <div>
        <Paper className="title" elevation={6}>
          Tasks List
        </Paper>
        <AcceptTaskList></AcceptTaskList>
      </div>
    </FixedLayout>
  );
};
