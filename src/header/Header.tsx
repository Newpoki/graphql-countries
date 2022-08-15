import { AppBar, ButtonBase, IconButton, Theme, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  homeButton: (theme: Theme) => ({
    padding: theme.spacing(2, 4),
    borderRadius: 2,
  }),
};

export const Header = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/", {});
  }, [navigate]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <ButtonBase sx={styles.homeButton} onClick={handleClick}>
          <Typography variant="h6" noWrap component="h1">
            Countries explorer
          </Typography>
        </ButtonBase>
      </Toolbar>
    </AppBar>
  );
};
