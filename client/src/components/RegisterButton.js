import * as React from "react";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material/styles";


export default function RegisterButton() {
  return (
      <Button variant="contained" type="submit" style={{width:'100%', background: "#6aa84f",
      textColor: "#ffffff"}}>Register</Button>
  );
}
