import { createBrowserRouter, Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { ResultsPage } from "./pages/ResultsPage";
import { RankingPage } from "./pages/RankingPage";
import { InputPage } from "./pages/InputPage";
import Header from "./components/Header";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}>
      <Header />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "results", element: <ResultsPage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "input", element: <InputPage /> },
      { index: true, element: <ResultsPage /> },
    ],
  },
]);
