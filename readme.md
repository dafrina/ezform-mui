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
<FieldText name="firstName" form={ezform} validator={requiredValidator} />
<FieldText name="lastName" form={ezform} validator={requiredValidator} />
<FieldText name="address.city" form={ezform} validator={requiredValidator} />
<FieldText name="address.country" form={ezform} validator={requiredValidator} />
````

You can create fully dynamic forms. Specify an object path to define fields:

````
// Map this fields value to 'firstName' property of first client
<FieldText name="clients[0].firstName" form={ezform} validator={requiredValidator} />

// or map 5 fields iteratively
{ Array(5).fill().map((num, index) => (
    <FieldText name={"clients[" + index + "].firstName"} form={ezform} validator={requiredValidator} />
))}
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

This interface acts as a base for all field properties. All form components described below (except FieldList and FieldCondition) can take the following properties:

- name: string;
- form: FormRefObject;
- id?: string;
- validator?: ValidatorType;
- disabled?: boolean;
- readonly?: boolean;
- label?: string;
- defaultValue?: any;

### FieldText

Basic text input

- multiline?: boolean
- variant?: "filled" | "outlined" | "standard";
- color?: "primary" | "secondary";
- placeholder?: string;

### FieldPassword

Same as text field, but for passwords

- variant?: "filled" | "outlined" | "standard";
- color?: "primary" | "secondary";
- placeholder?: string;

### FieldSelect

Select dropdown

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- variant?: "filled" | "outlined" | "standard";

### FieldMultiSelect

Simple multiple select dropdown

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- variant?: "filled" | "outlined" | "standard";

### FieldComboSelect

Multiple select dropdown with chips rendering selected options

- options: { key: string; value: string; label: string; disabled?: boolean }[];
- variant?: "filled" | "outlined" | "standard";
- color?: "primary" | "secondary";
- chipVariant?: "default" | "outlined";
- chipColor?: "primary" | "secondary";
- chipSize?: "medium" | "small";

### FieldCheckbox

Single checkbox

- color?: "default" | "primary" | "secondary";

### FieldSwitch

Switch input

- color?: "default" | "primary" | "secondary";
- labelBefore?: string;
- size?: "medium" | "small";

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
- accept?: string;

The submitted value will be of type [File](https://developer.mozilla.org/en-US/docs/Web/API/File) or [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) in case the ``multiple`` prop is passed.

### FieldList

Component to make dynamic lists containing fields.

Below is an example of a list (array) with objects containing an entry of two fields each (firstName, lastName).

The example validates only the first row of the list, effectively making only the first list entry obligatory.
````
<FieldList
    form={ezform}
    name="arrayExample"
    renderRow={({ add, remove, index, total }) => (
        <React.Fragment key={"list" + index}>
            <FieldText
                form={ezform}
                name={"arrayExample[" + index + "].firstName"}
                label="First name"
                validator={index < 1 ? requiredValidator : undefined}
            />
            <FieldText
                form={ezform}
                name={"arrayExample[" + index + "].lastName"}
                validator={index < 1 ? requiredValidator : undefined}
                label="Last name"
                variant="outlined"
            />
            
            {index === total ? (
                <Button onClick={add()}>Add</Button>
            ) : (
                <Button onClick={remove(index)}>Remove</Button>
            )}
        </React.Fragment>
    )}
/>
````

### FieldCondition

You can wrap any elements inside this component and render them conditionally.

This can be helpful to organize a more complex form.

````
<FieldCondition when={ foo === "bar" && isTheMoonShining() }>
    <p>I will only be rendered when foo equals 'bar' and isTheMoonShining() returns true</p>
</FieldCondition>
````
