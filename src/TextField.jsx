import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as MD from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    field: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch"
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

export default function TextField(props) {
  const classes = useStyles();

  const errors = props.richForm.errors[props.name];

  return (
    <div className={clsx(classes.field, {[classes.fullWidth]: props.fullWidth})}>
      <div>
        <MD.TextField
          {...props.richForm.textField(props.name)}
          label={"English Phrase"}
          fullWidth
        />
      </div>
      <div className={clsx(classes.error, { [classes.show]: errors })}>
        {parseError(errors)}
      </div>
    </div>
  );
}

TextField.propTypes = {
  richForm: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};
