import React, { useState, useEffect } from "react";
import * as MD from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonSuccess: {
      backgroundColor: theme.palette.success.main,
      "&:hover": {
        backgroundColor: theme.palette.success.main,
      },
      "&:disabled": {
        backgroundColor: `${theme.palette.success.main} !important`,
        color: `white !important`,
      },
    },
    buttonError: {
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.main,
      },
      "&:disabled": {
        backgroundColor: `${theme.palette.error.dark} !important`,
        color: `white !important`,
      },
    }
  })
);

export default function CircularButton(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
    [classes.buttonError]: props.error,
  });

  useEffect(() => {
    if (loading !== props.loading) {
      if (props.loading === false) {
        setLoading(false);
      } else {
        // show a spinner after a short delay
        let timeout = setTimeout(() => {
          setLoading(true);
        }, 600);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [props.loading]);

  return (
    <div className={classes.wrapper}>
      <MD.Button
        type={props.type}
        variant={props.variant}
        disabled={props.disabled || props.loading}
        aria-label={props.label}
        color={props.color}
        className={buttonClassname}
        onClick={props.onClick}
      >
        {loading && (
          <MD.CircularProgress size={20} />
        )}
        {!loading && (props.error ? (
          <ErrorOutlineRoundedIcon />
        ) : props.success ? (
          <CheckIcon />
        ) : props.label)}
      </MD.Button>
    </div>
  );
}

CircularButton.propTypes = {
  icon: PropTypes.any.isRequired,
  successIcon: PropTypes.elementType,
  onClick: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  success: PropTypes.any,
  error: PropTypes.any,
};
