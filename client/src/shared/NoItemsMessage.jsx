import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Typography } from "@mui/material";
import React from "react";

function NoItemsMessage() {
  return (
    <div className="container">
      <div>
        <SentimentVeryDissatisfiedIcon
          style={{ fontSize: "20em" }}
        ></SentimentVeryDissatisfiedIcon>
      </div>
      <Typography style={{ marginLeft: "1rem", fontSize: "1.2rem" }}>
        No items to display
      </Typography>
    </div>
  );
}

export default NoItemsMessage;
