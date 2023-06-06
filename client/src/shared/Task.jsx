import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  acceptTask as acceptTaskRequest,
  completeTask,
  fetchAllTasks,
} from "../utils/api";
import { getAccessToken } from "../utils/auth";
import { Status, TaskType } from "../utils/models";
import {ethers} from "ethers"

const Task = ({
  taskId,
  taskName,
  description,
  incentive,
  givenName,
  picture,
  fileData,
  result,
  executor,
  status,
  taskType = TaskType.ACCEPT,
  setTasks,
  setOpen,
  contractDetails
}) => {
  const acceptTask = async (fileData) => {
    console.log("in accept task");
    const rs = await acceptTaskRequest(getAccessToken(), taskId);
    console.log(rs);
    const blob = new Blob(
      [
        decodeURI(fileData) +
          `
    onmessage = () => {
      const solution = main();
      postMessage({
        solution,
      });
    };
    `,
      ],
      { type: "text/javascript" }
    );
    console.log(blob);
    const file = new File([blob], "test.js");
    const worker = new window.Worker(URL.createObjectURL(file));
    worker.postMessage({});
    worker.onmessage = async (e) => {
      // TODO: Make a function out of this
      // const blob = new Blob([e.data.solution], { type: "text/javascript" });
      // const link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "results.txt";
      // link.click();
      // TODO: End
      setOpen(true);

      const fetchData = async () => {
        const rs = await fetchAllTasks(getAccessToken());
        console.log(rs);
        setTasks(rs.data.data);
      };
      fetchData();

      const rs = await completeTask(getAccessToken(), e.data.solution, taskId);
      const {ethereum}=window;
      if(ethereum){
        const account=await ethereum.request({ method: 'eth_requestAccounts'})
        const value={value:ethers.utils.parseEther(`${incentive}`)}
        const transaction=await contractDetails.contract.taskComplete(account[0],incentive)
        await transaction.wait()
        console.log("Transaction Done")
      }
      // console.log(rs);

      // console.log(e.data);
      console.log("task completed!");

    };
  };

  const downloadTask = (fileData, fileName = "task") => {
    const blob = new Blob([decodeURI(fileData)], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "2rem auto" }}>
      <CardHeader
        avatar={<Avatar src={picture}></Avatar>}
        title={<h2 style={{ margin: 0 }}>{taskName}</h2>}
        subheader={`by ${givenName}`}
      />
      <Typography style={{ marginLeft: "1rem", fontSize: "1.2rem" }}>
        {`$${incentive}`}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "justify" }}
        >
          {description}
        </Typography>
      </CardContent>
      {taskType === TaskType.ACCEPT ? (
        <CardActions disableSpacing style={{ justifyContent: "flex-end" }}>
          <IconButton
            aria-label="download task"
            onClick={() => {
              downloadTask(fileData);
            }}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton
            aria-label="accept task"
            onClick={() => {
              acceptTask(fileData);
            }}
          >
            <DoneIcon />
          </IconButton>
        </CardActions>
      ) : taskType === TaskType.EXECUTED ? (
        <>
          <Typography
            variant="body2"
            component="p"
            sx={{
              flexGrow: 1,
              ml: 2,
              mb: 2,
              fontFamily: "monospace",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {`Result: ${result}`}
          </Typography>
        </>
      ) : (
        <>
          {status === Status.COMPLETE ? (
            <>
              <Typography
                variant="body2"
                component="p"
                sx={{
                  flexGrow: 1,
                  ml: 2,
                  fontFamily: "monospace",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                {`Result: ${result}`}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{
                  flexGrow: 1,
                  ml: 2,
                  fontFamily: "monospace",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                {`Executed by: ${executor.given_name}`}
              </Typography>
            </>
          ) : (
            <></>
          )}
          <Typography
            variant="body2"
            component="p"
            sx={{
              flexGrow: 1,
              ml: 2,
              mb: 2,
              fontFamily: "monospace",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {`Status: ${status}`}
          </Typography>
        </>
      )}
    </Card>
  );
};

export default Task;
