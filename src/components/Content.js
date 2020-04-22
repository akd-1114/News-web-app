import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 285;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flex: 1,
    fontSize: 40,
    opacity: 0.5,
    padding: theme.spacing(3),
    margin: theme.spacing(5),
    marginLeft: drawerWidth + 30,
    textAlign: "center",
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      Search for breaking news from across the world, across the times.
    </main>
  );
}

export default ResponsiveDrawer;
