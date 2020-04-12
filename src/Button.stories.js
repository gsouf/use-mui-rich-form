import React, { useEffect } from "react";
import Button from "./Button";
import useMuiRichForm from "./useMuiRichForm";

export default {
  title: "Button",
  component: Button,
};

export const DefaultState = () => {
  const richForm = useMuiRichForm();

  return <Button {...richForm.submitButton()} label={"Button"} />;
};

export const Loading = () => {
  const richForm = useMuiRichForm();

  useEffect(richForm.setLoading, []);

  return <Button {...richForm.submitButton()} label={"Button"} />;
};

export const Processing = () => {
  const richForm = useMuiRichForm();

  useEffect(richForm.setProcessing, []);

  return <Button {...richForm.submitButton()} label={"Button"} />;
};

export const Success = () => {
  const richForm = useMuiRichForm();

  useEffect(() => {
    richForm.setSuccess("done", { readOnly: false });
  }, []);

  return <Button {...richForm.submitButton()} label={"Button"} />;
};

export const Failure = () => {
  const richForm = useMuiRichForm();

  useEffect(() => {
    richForm.setFailure("error");
  }, []);

  return <Button {...richForm.submitButton()} label={"Button"} />;
};
