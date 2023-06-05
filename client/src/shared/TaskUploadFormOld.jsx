import React from "react";
import { Button, Grid, TextField } from "@mui/material";

const TaskUploadForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} justifyContent="center">
        <Grid item md={10} xs={8}>
          <TextField fullWidth label="Name" variant="filled" />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item md={4} xs={8}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            variant="filled"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item md={4} xs={8}>
          <TextField fullWidth label="Public Key" variant="filled" />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item md={4} xs={8}>
          <TextField
            fullWidth
            label="Incentive"
            type="number"
            variant="filled"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item md={4} xs={8}>
          <TextField fullWidth type="file" variant="filled" />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid container item md={4} xs={8} justifyContent="center">
          <Button item variant="contained" onSubmit={() => {}}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskUploadForm;
