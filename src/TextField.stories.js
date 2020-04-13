import React, { useEffect } from "react";
import TextField from "./TextField";
import useMuiRichForm from "./useMuiRichForm";

export default {
  title: "TextField",
  component: TextField,
};

export const DefaultState = () => {
  const richForm = useMuiRichForm();

  return <TextField richForm={richForm} label={"demo"} name={"foo"} />;
};

export const NumberField = () => {
  const richForm = useMuiRichForm();

  return (
    <TextField
      richForm={richForm}
      label={"number - max 10"}
      name={"foo"}
      type={"number"}
      inputProps={{ max: "10" }}
    />
  );
};
