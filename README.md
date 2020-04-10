# use-mui-rich-form

An opinionated react hook to make it easier to work with form stats (processing/success/failure)
with [material-ui](https://material-ui.com/) and [react-hook-forms](https://react-hook-form.com/)
and that features ready to use Mui components.

[![NPM](https://img.shields.io/npm/v/use-mui-rich-form.svg)](https://www.npmjs.com/package/use-mui-rich-form)

## Install

```bash
npm install --save use-mui-rich-form
```

## Usage

```jsx
import React from 'react';
import * as Mui from "@material-ui/core";
import { useMuiRichForm, Form, Field, CircularButton } from 'use-mui-rich-form';
import SaveIcon from "@material-ui/icons/Save";

const Example = () => {
  const richForm = useMuiRichForm();

  const onSubmit = async (values) => {
     richForm.setProcessing();
     try {
       await doStuff();
       richForm.setSuccess('stuff done');
     } catch (e) {
       console.error(e);
       richForm.setFailure('Something went wrong');
     }
  }

  return (
    <div>
      <Form richForm={richForm} onSubmit={onSubmit}>
        <Field error={richForm.error.someText}>
          <Miu.TextField id="some_text" label="Some Text" {...richForm.textField('someText', {required: true})} />
        </Field>

        <CircularButton {...richForm.submitButton()} icon={<SaveIcon />} />
        { richForm.success }
        { richForm.failure }
      </Form>
    </div>
  )
}
```

## License

MIT © [gsouf](https://github.com/gsouf)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
