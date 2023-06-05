import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const TaskUploadForm = ({ formData, setFormData }) => {
  // name: null,
  // description: null,
  // publicKey: null,
  // incentive: null,
  // fileData: null,

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      console.log(text);
      setFormData((values) => ({ ...values, fileData: text }));
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} justifyContent="center">
        <TextField
          fullWidth
          label="Name"
          variant="filled"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          variant="filled"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <TextField
          fullWidth
          label="Public Key"
          variant="filled"
          name="publicKey"
          value={formData.publicKey}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <TextField
          fullWidth
          label="Incentive"
          type="number"
          variant="filled"
          name="incentive"
          value={formData.incentive}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <TextField
          fullWidth
          type="file"
          variant="filled"
          name="file"
          onChange={handleFileUpload}
          inputProps={{ accept: "text/javascript" }}
        />
      </Grid>
    </Grid>
  );
};

export default TaskUploadForm;
