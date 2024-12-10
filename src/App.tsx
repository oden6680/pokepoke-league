import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CssBaseline, Box } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <RouterProvider router={router} />
      </Box>
    </>
  );
};

export default App;
