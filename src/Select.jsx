import React, { useRef } from "react";
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

export default function Select(props) {
  const classes = useStyles();
  const refId = useRef(null);

  if (null === refId.current) {
    refId.current = `${props.name}_${
      new Date().getTime() + Math.floor(Math.random() * Math.floor(1000))
    }`;
  }

  const errors = props.richForm.errors[props.name];

  return (
    <MD.FormControl
      error={!!errors}
      fullWidth={props.fullWidth}
      className={classes.field}
    >
      <MD.InputLabel id={refId.current}>
        {props.label + (props.rules?.required ? " *" : "")}
      </MD.InputLabel>
      <Controller
        name={props.name}
        rules={props.rules}
        as={
          <MD.Select
            labelId={refId.current}
            fullWidth={props.fullWidth}
            autoFocus={props.autoFocus}
            multiple={props.multiple}
            {...props.TextFieldProps}
            disabled={props.richForm.readOnly}
          >
            {props.children}
          </MD.Select>
        }
        control={props.richForm.control}
        defaultValue={props.defaultValue || ""}
      />

      <MD.FormHelperText
        className={clsx(classes.error, { [classes.show]: errors })}
      >
        {parseError(errors)}
      </MD.FormHelperText>
    </MD.FormControl>
  );
}

Select.propTypes = {
  richForm: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  rules: PropTypes.object,
  autoFocus: PropTypes.bool,
  SelectProps: PropTypes.object,
  multiple: PropTypes.bool,
  defaultValue: PropTypes.any,
};
