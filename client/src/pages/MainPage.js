import { Component } from "react";
import { Typography } from "@mui/material";

class MainPage extends Component {
  render() {
    return (
      <div>
        <Typography variant="h3" marginTop="10%" marginLeft="10%">
          Dear user, you can only go to register page:{" "}
          <a href="/register">RegisterPage</a>
        </Typography>
      </div>
    );
  }
}

export default MainPage;
