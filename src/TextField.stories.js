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
