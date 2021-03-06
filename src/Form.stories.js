import React, { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import Form from "./Form";
import TextField from "./TextField";
import Button from "./Button";
import Select from "./Select";
import { MenuItem } from "@material-ui/core";
import useMuiRichForm from "./useMuiRichForm";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export default {
  title: "Form",
  component: Form,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    actions: {
      "& > *": {
        margin: "0.5rem",
      },
    },
  })
);

export const Demo = () => {
  const classes = useStyles();
  const richForm = useMuiRichForm();

  return (
    <>
      <Form
        richForm={richForm}
        onSubmit={(v) => {
          console.log("foo");
          action("submit")(JSON.stringify(v));
        }}
      >
        <TextField richForm={richForm} label={"simple"} name={"simple"} />
        <TextField
          richForm={richForm}
          label={"autofocus"}
          name={"autofocus"}
          autoFocus
        />
        <TextField
          multiline
          richForm={richForm}
          label={"multiline"}
          name={"multiline"}
        />
        <TextField
          fullWidth
          richForm={richForm}
          label={"fullwidth"}
          name={"fullwidth"}
        />
        <TextField
          richForm={richForm}
          label={"required"}
          name={"required"}
          rules={{ required: true }}
        />
        <Select
          richForm={richForm}
          label={"select"}
          name={"select"}
          rules={{ required: true }}
        >
          <MenuItem value="">none</MenuItem>
          <MenuItem value="foo">Foo</MenuItem>
          <MenuItem value="bar">Bar</MenuItem>
        </Select>
        <Button {...richForm.submitButton()} label={"submit"} />
        {richForm.failure}
        {richForm.success}
      </Form>
      <hr />
      <div className={classes.actions}>
        <button onClick={richForm.setLoading}>loading</button>
        <button onClick={richForm.setReady}>ready</button>
        <button onClick={richForm.setProcessing}>processing</button>
        <button
          onClick={() => {
            richForm.setSuccess("done");
          }}
        >
          success readonly
        </button>
        <button
          onClick={() => {
            richForm.setSuccess("done", { readOnly: false });
          }}
        >
          success not readonly
        </button>
        <button
          onClick={() => {
            richForm.setSuccess("done", { dismissAfter: 1000 });
          }}
        >
          success dismiss after 1s
        </button>
        <button
          onClick={() => {
            richForm.setSuccess("done", { resetForm: true });
          }}
        >
          success and reset form
        </button>
        <button
          onClick={() => {
            richForm.setFailure("failure");
          }}
        >
          failure
        </button>
      </div>
    </>
  );
};

export const SetValue = () => {
  const classes = useStyles();
  const richForm = useMuiRichForm();

  return (
    <>
      <Form
        richForm={richForm}
        onSubmit={(v) => {
          console.log("foo");
          action("submit")(JSON.stringify(v));
        }}
      >
        <TextField richForm={richForm} label={"simple"} name={"simple"} />
        <Select
          richForm={richForm}
          label={"select"}
          name={"select"}
          rules={{ required: true }}
        >
          <MenuItem value="">none</MenuItem>
          <MenuItem value="foo">Foo</MenuItem>
          <MenuItem value="bar">Bar</MenuItem>
        </Select>
        <Button {...richForm.submitButton()} label={"submit"} />
        {richForm.failure}
        {richForm.success}
      </Form>
      <hr />
      <div className={classes.actions}>
        <button onClick={() => richForm.setValue("simple", "foo")}>
          text:foo
        </button>
        <button onClick={() => richForm.setValue("simple", "bar")}>
          text:bar
        </button>
        <button onClick={() => richForm.setValue("select", "foo")}>
          select:foo
        </button>
        <button onClick={() => richForm.setValue("select", "bar")}>
          select:bar
        </button>
      </div>
    </>
  );
};
