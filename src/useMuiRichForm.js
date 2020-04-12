import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useMuiRichForm() {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues,
    control,
  } = useForm();
  const [failure, setFailure] = useState(null);
  const [buttonFailure, setButtonFailure] = useState(null);

  return {
    loading,
    setLoading: () => {
      setLoading(true);
      setProcessing(false);
      setReadOnly(true);
      setSuccess(null);
      setFailure(null);
    },
    setReady: () => {
      setLoading(false);
      setProcessing(false);
      setReadOnly(false);
      setSuccess(null);
      setFailure(null);
    },
    processing,
    setProcessing: () => {
      setProcessing(true);
      setLoading(false);
      setReadOnly(true);
      setSuccess(null);
      setFailure(null);
    },
    success,
    setSuccess: async (
      message,
      options = { readOnly: true, dismissAfter: null, resetForm: false }
    ) => {
      const {
        readOnly = true,
        dismissAfter = null,
        resetForm = false,
      } = options;

      setSuccess(message);
      setReadOnly(readOnly);
      setProcessing(false);
      setLoading(false);
      setFailure(null);

      // reset values
      if (resetForm) {
        console.log("foobar");
        reset();
      }

      // remove success status after the given time
      if (dismissAfter) {
        return new Promise((resolve) =>
          setTimeout(() => {
            setSuccess(null);
            resolve();
          }, dismissAfter)
        );
      }
    },
    readOnly,
    setReadOnly,
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    errors,
    failure,
    setFailure: (message) => {
      setFailure(message);
      setReadOnly(false);
      setProcessing(false);
      setLoading(false);
      setSuccess(null);

      setButtonFailure(true);
      setTimeout(() => setButtonFailure(false), 1000);
    },
    submitButton: () => {
      return {
        color: "primary",
        type: !processing && !readOnly ? "submit" : "button",
        loading: processing,
        disabled: !!(processing || readOnly),
        success: !!success,
        error: buttonFailure,
      };
    },
  };
}
