import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useMuiRichForm() {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [failure, setFailure] = useState(null);

  return {
    processing,
    setProcessing: () => {
      setProcessing(true);
      setReadOnly(true);
      setSuccess(null);
      setFailure(null);
    },
    success,
    setSuccess: (
      message,
      options = { readOnly: true, dismissAfter: null }
    ) => {
      const { readOnly = true, dismissAfter = null } = options;

      setSuccess(message);
      setReadOnly(readOnly);
      setProcessing(false);
      setFailure(null);

      // reset success after the given time
      if (dismissAfter) {
        setTimeout(() => {
          setSuccess(null);
        }, dismissAfter);
      }
    },
    readOnly,
    setReadOnly,
    handleSubmit,
    register,
    errors,
    failure,
    setFailure: (message) => {
      setFailure(message);
      setReadOnly(false);
      setProcessing(false);
      setSuccess(null);
    },
    submitButton: () => {
      return {
        color: "primary",
        type: !processing && !readOnly ? "submit" : "button",
        loading: processing,
        disabled: processing || readOnly,
        success: !!success,
        error: !!failure,
      };
    },
    textField: (name, options = {}) => ({
      name,
      error: errors[name],
      inputRef: register(options),
      required: !!options.required,
    }),
  };
}
