import { AcceptTaskList } from "../shared/AcceptTaskList";
import { Paper } from "@mui/material";
import "./AcceptTaskPage.css";
import { FixedLayout } from "../shared/FixedLayout";
import Navbar from "../shared/Navbar";
import CreatedTaskList from "../shared/CreatedTaskList";
import CompletedTaskList from "../shared/CompletedTaskList";

export const AcceptTaskPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <FixedLayout>
        <div>
          <Paper className="title" elevation={6}>
            Tasks List
          </Paper>
          <AcceptTaskList></AcceptTaskList>
        </div>
      </FixedLayout>
    </>
  );
};
