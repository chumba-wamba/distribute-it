import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

const TaskUploading = () => {
  const [inputs, setInputs] = useState({
    taskname: "",
    description: "",
    file: "",
    publickey: "",
    incentive: "",
    workerfile: "",
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(inputs.workerfile);
  };

  return (
    <>
      <Navbar></Navbar>
      <center>
        <div>
          <form onSubmit={handleSubmit}>
            <table>
              <br></br>
              <tr>
                <TextField
                  id="outlined-basic"
                  label="Task Name"
                  variant="outlined"
                  name="taskname"
                  value={inputs.taskname || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </tr>
              <br></br>
              <tr>
                <TextField
                  id="outlined-basic"
                  label="Task Description"
                  variant="outlined"
                  name="description"
                  value={inputs.description || ""}
                  onChange={handleChange}
                  multiline
                  fullWidth
                />
              </tr>
              <br></br>
              <tr>
                <TextField
                  id="outlined-basic"
                  label="Public Key"
                  variant="outlined"
                  name="publickey"
                  value={inputs.publickey || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </tr>
              <br></br>
              <tr>
                <TextField
                  id="outlined-basic"
                  label="Incentive"
                  variant="outlined"
                  name="incentive"
                  value={inputs.incentive || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </tr>{" "}
              <br></br>
              <center>
                <tr>
                  <Button variant="contained" component="label">
                    Upload code file
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      name="workerfile"
                      value={inputs.workerfile || ""}
                      onChange={handleChange}
                    />
                  </Button>
                </tr>
                <tr>
                  <td>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>{" "}
                    <Button type="submit" variant="contained">
                      Cancel
                    </Button>
                  </td>
                </tr>
              </center>
            </table>
          </form>
        </div>
      </center>
    </>
  );
};

export default TaskUploading;
