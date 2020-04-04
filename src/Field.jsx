import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    field: {
      display: "flex",
      flexDirection: "column",
    },
    error: {
      opacity: 0,
      transition: "opacity 0.3s",
      fontSize: "0.8em",
      color: theme.palette.error.main,
    },
    show: {
      opacity: 1,
    },
  })
);

function parseError(error) {
  if (!error) {
    return <span>&nbsp;</span>;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error.message) {
    return error.message;
  } else if (error.type === "required") {
    return "Required";
  } else {
    return "Error";
  }
}

export default function Field(props) {
  const classes = useStyles();

  return (
    <div className={classes.field}>
      <div>{props.children}</div>
      <div className={clsx(classes.error, { [classes.show]: props.error })}>
        {parseError(props.error)}
      </div>
    </div>
  );
}
