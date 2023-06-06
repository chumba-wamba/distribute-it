import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import Task from "../shared/Task";
import { fetchAllTasks } from "../utils/api";
import { getAccessToken } from "../utils/auth";
import { Status } from "../utils/models";
import NoItemsMessage from "../shared/NoItemsMessage";
import {ethers} from "ethers";

const AcceptTaskPage = ({contractDetails}) => {
  const [tasks, setTasks] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const areIncompleteTasks = (tasks) =>
    tasks && tasks.some((task) => task.status === Status.INCOMPLETE);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await fetchAllTasks(getAccessToken());
      console.log(rs);
      setTasks(rs.data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ margin: "2rem" }}>
        {areIncompleteTasks(tasks) ? (
          tasks.map((task) => {
            if (task.status === Status.INCOMPLETE)
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
                  setTasks={setTasks}
                  setOpen={setOpen}
                  contractDetails={contractDetails}
                ></Task>
              );
          })
        ) : (
          <NoItemsMessage></NoItemsMessage>
        )}
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          Task executed successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AcceptTaskPage;
