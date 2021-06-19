import { Container, Box } from "@material-ui/core";
import React from "react";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";

function App() {
  return (
    <>
      <Container>
        <HeaderComponent />
        <Box display="flex" flexWrap="wrap" alignContent="flex-end" p={5} m={5}>
          <ListEmployeeComponent />
        </Box>
      </Container>
    </>
  );
}

export default App;
