import { useState } from "react";
import { useForm } from "react-hook-form";

type RichForm = {
  // props
  processing: boolean;
  success: string | null;
  readOnly: boolean;
  failure: string | null;

  // setters
  setProcessing(): void;
  setSuccess(
    message: string | null,
    options?: { readOnly?: boolean; dismissAfter?: number | null }
  ): void;
  setFailure(message: string | null): any;
  setReadOnly: any;

  // from react-hook-form
  handleSubmit(onsubmit: any): any;
  errors: any;
  register: any;

  // presets
  submitButton(): {
    type: string;
    loading: boolean;
    disabled: boolean;
    success: boolean;
  };
  textField(name: string, options: any): object;
};

export default function useMuiRichForm(): RichForm {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [readOnly, setReadOnly] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [failure, setFailure] = useState<string | null>(null);

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
    ): void => {
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
