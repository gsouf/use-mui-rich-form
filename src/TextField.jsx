import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as MD from "@material-ui/core";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) =>
  createStyles({
    field: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
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
    <div
      className={clsx(classes.field, { [classes.fullWidth]: props.fullWidth })}
    >
      <div>
        <Controller
          name={props.name}
          rules={props.rules}
          as={
            <MD.TextField
              error={!!errors}
              label={props.label + (props.rules?.required ? " *" : "")}
              fullWidth={props.fullWidth}
              autoFocus={props.autoFocus}
              multiline={props.multiline}
              type={props.type}
              inputProps={props.inputProps}
              rows={props.rows}
              rowsMax={props.rowsMax}
              {...props.TextFieldProps}
            />
          }
          control={props.richForm.control}
          defaultValue={props.defaultValue || ""}
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
  rules: PropTypes.object,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  TextFieldProps: PropTypes.object,
  defaultValue: PropTypes.any,
  type: PropTypes.string,
  inputProps: PropTypes.any,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
