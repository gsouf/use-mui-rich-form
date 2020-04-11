import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative'
    },
    fieldset: {
      margin: 0,
      padding: 0,
      border: 0,
    },
    loading: {
      position: 'absolute',
      top: '4rem',
      left: '4rem',
      bottom: '4rem',
      right: '4rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    spinner: {
      background: `rgba(0, 0, 0, 0.5)`,
      borderRadius: '5px',
      padding: theme.spacing(1)
    }
  })
);

export default function Form(props) {
  const classes = useStyles();

  const { disabled, children, richForm, ...rest } = props;

  return (
    <form {...rest} className={classes.root} onSubmit={props.richForm.handleSubmit(props.onSubmit)}>
      <fieldset className={classes.fieldset} disabled={richForm.readOnly}>
        {children}
      </fieldset>
      {richForm.loading && (
        <div className={classes.loading}>
          <div className={classes.spinner}>
            <CircularProgress size={35}/>
          </div>
        </div>
      )}
    </form>
  );
}
