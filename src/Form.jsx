import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldset: {
      margin: 0,
      padding: 0,
      border: 0,
    },
  })
);

export default function Form(props) {
  const classes = useStyles();

  const { disabled, children, richForm, ...rest } = props;

  return (
    <form {...rest} onSubmit={props.richForm.handleSubmit(props.onSubmit)}>
      <fieldset className={classes.fieldset} disabled={richForm.readOnly}>
        {children}
      </fieldset>
    </form>
  );
}
