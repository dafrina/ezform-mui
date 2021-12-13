# EZForm is an easy form and field-level validation library for react using Material UI components

## Build Project

````
npm install -g typescript; npm install; npm run build;
````

## Demo

You can find a working demo here:

(https://codesandbox.io/s/restless-shape-7rjl6)

## Install

````
npm i moment --save
npm i @date-io/moment@1.3.13 --save
npm i @material-ui/core --save
npm i @material-ui/lab  --save
npm i @material-ui/pickers --save
npm i @ezform/mui --save
````

(https://www.npmjs.com/package/@ezform/mui)

## Usage

> This package makes use of @ezform/core and Material UI to implement a set of form fields.
> 
> [Click Here](https://github.com/dafrina/ezform) to learn more about the core library.

Example usage:

````
const ezform = useForm({
    onSubmit: (values) => {
        console.log("Form got submitted. Form values:", values);
    },
    initialState: {
        firstName: "Johnny",
        lastName: "Silverhand",
        address: {
            city: "New York",
            country: "United States"
        }
    },
    formatMessage: (messageKey) => translate(messageKey),
});

...

<FieldText id="firstName" name="firstName" form={ezform} validator={requiredValidator} label="Please enter your first name" />
<FieldText id="lastName" name="lastName" form={ezform} validator={requiredValidator} label="Dont forget your last name" />
<FieldText id="city" name="address.city" form={ezform} validator={requiredValidator} label="City" />
<FieldText id="country" name="address.country" form={ezform} validator={requiredValidator} label="Country" />
````

## Global Config
You can define a global configuration for some props of inputs:
````
import { EzformMuiConfig } from "@ezform/mui";

// set config globally
EzformMuiConfig({
    buttonLabel: "Select file",
    noFileSelectedText: "No file selected",
    fileSelectedText: "$n file(s) selected",
});

// get global config
const config = EzformMuiConfig();
````

## Components

This library provides a basic set of form fields based on Material UI components. You can also create your own components to use with EZForm. [Click here](https://github.com/dafrina/ezform#creating-your-own-fields) to find out how.

### FieldBase interface

This interface acts as a base for all field properties. All form components described below (except FieldCondition) can take the following properties:

- name: string;
- form: FormRefObject;
- id?: string;
- validator?: (value: any) => string | null;
- disabled?: boolean;
- readonly?: boolean;
- label?: string;

### FieldText

Basic text input

- multiline?: boolean
- variant?: "filled" | "outlined" | "standard";
- color?: "primary" | "secondary";
- placeholder?: string;

### FieldSelect

Select dropdown

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- variant?: "filled" | "outlined" | "standard";

### FieldMultiSelect

Select dropdown

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- variant?: "filled" | "outlined" | "standard";

### FieldCheckbox

Single checkbox

- color?: "default" | "primary" | "secondary";

### FieldCheckboxGroup

Multiple checkboxes under the same field name

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- color?: "default" | "primary" | "secondary";

### FieldRadioGroup

Multiple radio inputs under the same field name

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- color?: "default" | "primary" | "secondary";

### FieldSearchSelect

Experimental select with search ability

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- variant?: "filled" | "outlined" | "standard";

### FieldDate

Material UI's date input. Please visit (https://material-ui-pickers.dev) for details on what these props do.

The date will be stored in the form fields as a UNIX timestamp. Default type is "date".

- format: string;
- type?: "date" | "datetime" | "time"
- disableToolbar?: boolean;
- autoOk?: boolean;
- variant?: "filled" | "outlined" | "standard";
- minDate?: ParsableDate;
- minDateMessage?: ReactNode;
- maxDate?: ParsableDate;
- maxDateMessage?: ReactNode;
- initialDate?: ParsableDate;
- disablePast?: boolean;
- disableFuture?: boolean;

EZForm uses `@date-io/moment` to convert dates

### FieldFile

Simple file upload using native input type="file". This field will be rendered as a button.

- buttonLabel?: string;
- defaultHelperText?: string;
- noFileSelectedText?: string;
- fileSelectedText?: string;
- variant?: "contained" | "outlined" | "text";
- color?: "default" | "inherit" | "primary" | "secondary";
- multiple?: boolean;

The submitted value will be of type [File](https://developer.mozilla.org/en-US/docs/Web/API/File) or [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) in case the ``multiple`` prop is passed.

### FieldCondition

You can wrap any elements inside this component and render them conditionally.

This can be helpful to organize a more complex form.

````
<FieldCondition when={ foo === "bar" && isTheMoonShining() }>
    <p>I will only be rendered when foo equals 'bar' and isTheMoonShining() returns true</p>
</FieldCondition>
````
