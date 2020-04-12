import React from "react";
import { addDecorator } from "@storybook/react";
import { CssBaseline, Box, Card, CardContent } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

const uiTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      margin: "2rem",
    },
  })
);

addDecorator((storyFn) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={uiTheme}>
      <CssBaseline />
      <Box className={classes.wrapper}>
        <Card>
          <CardContent>{storyFn()}</CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
});
