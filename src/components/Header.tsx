import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpDialog from "./HelpDialog";
import pokemiaLeagueLogo from "../icons/pokepoke-league-logo.png";

const Header = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  const handleHelpOpen = () => setHelpOpen(true);
  const handleHelpClose = () => setHelpOpen(false);

  return (
    <>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Box
            component="img"
            src={pokemiaLeagueLogo}
            alt="ポケミアリーグロゴ"
            sx={{ height: 40, mr: 2 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            ポケミアリーグ
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleHelpOpen}
            aria-label="ヘルプ">
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <HelpDialog open={helpOpen} onClose={handleHelpClose} />
    </>
  );
};

export default Header;
