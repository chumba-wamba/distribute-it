import { Fab } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import TaskUploadForm from "../shared/TaskUploadForm";
import AddIcon from "@mui/icons-material/Add";
import { createTask } from "../utils/api";
import { getAccessToken } from "../utils/auth";
import {ethers} from "ethers";

const TaskUploadPage = ({contractDetails}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    incentive: "",
    publicKey: "",
    fileData: "",
  });


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    // TODO: E2E verification of the form submission
    console.log(formData);

    if (Object.values(formData).indexOf("") > -1) {
      return;
    }
    const task = {
      name: formData.name,
      description: formData.description,
      incentive_amount: formData.incentive,
      public_key: formData.publicKey,
      file: encodeURI(formData.fileData),
    };


    const value={value:ethers.utils.parseEther(`${formData.incentive}`)}
    const transaction=await contractDetails.contract.uploadTask(task.name,"trans",value) 
    await transaction.wait()
    console.log("Transaction Done")
    const rs = await createTask(getAccessToken(), task);
    console.log(rs);
    handleClose();
  };

  const style = {
    position: "fixed",
    right: "2rem",
    bottom: "2rem",
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        style={style}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Task</DialogTitle>
        <DialogContent>
          <TaskUploadForm
            formData={formData}
            setFormData={setFormData}
          ></TaskUploadForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskUploadPage;
