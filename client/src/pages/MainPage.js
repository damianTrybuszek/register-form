import React from "react";
import { Typography } from "@mui/material";

const MainPage = () =>  {
    return (
        <Typography variant="h3" marginTop="10%" marginLeft="10%">
          Dear user, you can only go to register page:{" "}
          <a href="/register">RegisterPage</a>
        </Typography>
    );
}

export default MainPage;
