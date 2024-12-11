import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar variant="dense">
        <Typography variant="h6" noWrap>
          ポケミアリーグ
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
