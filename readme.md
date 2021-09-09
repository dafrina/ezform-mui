# EZForm is an easy form and field-level validation library for react using Material UI components

## Build Project

````
npm install -g typescript; npm install; npm run build;
````

## Demo

You can find a working demo here:

(https://codesandbox.io/s/adoring-dewdney-7o9f9)

## Install

````
npm i @ezform/mui --save
````

(https://www.npmjs.com/package/@ezform/mui)

## How it works

EZForm's core mechanic relies on hooks. Each `Field` component registers its validator to the form object created by the `useForm` hook. This process takes place after the component has been mounted. In turn, when the component is unmounted, it automatically unregisters itself from the form. This means you can dynamically add and remove form fields and have more complex structured forms, without having to know how all fields look like in the form.

When a `Field`s value changes, it will update the `field` state provided by the hook and validate that single field. If an error occurs, the error message will be stored in the `errors` state provided by the hook.

The aim of this project was to make a powerful validation library that not only works well, but also is extremely easy to use with as little setup as possible required. And EZ indeed it is!

## Usage

First we need to tell the program that we want to build a form, and what happens when we submit said form. The form will only be submitted if no currently mounted fields fail validation. We can set initial data to prefill our form and we can pass a function as `formatMessage`, which can be used to translate the error message from the validators.


````
interface FormConfig {
    onSubmit: (values: any) => void;
    initialState?: any;
    formatMessage?: (messageKey: string) => string;
}

useForm(config: FormConfig);
````

For example:

````
const ezform = useForm({
    onSubmit: (values) => {
        console.log("Form got submitted. Form values:", values);
    },
    initialState: {
        firstName: "Johnny",
        lastName: "Silverhand"
    },
    formatMessage: (messageKey) => translate(messageKey)
});
````

The `useForm` hook returns a `FormRefObject` which contains the following properties/methods:

- fields: (object containing all form fields with its values)
- setFields: (default setter function for the form fields state)
- setField: (name: string, value: any, validateImmediately?: boolean (default true))
- getField: (name: string)
- errors: (object containing all form fields with its error messages or null)
- setErrors: (default setter function for the form errors state)
- hasError: (fieldName: string) => boolean
- validators: (object containing all currently registered validators);
- setValidators: (default setter function for the validators state)
- submit: () => void (validates all form fields and calls the onSubmit function passed to the useForm hook)
- reset: () => void (clears all form fields and resets the errors)
- getHelperText: (fieldName: string) => string
- formatMessage?: (messageKey: string) => string;

Now lets get to the interesting part! We can now build our form however we like it, without wrapper components or any other setup but the useForm hook.

````
<FieldText id="firstName" name="firstName" form={ezform} validator={requiredValidator} label="Please enter your first name" />
<FieldText id="lastName" name="lastName" form={ezform} validator={requiredValidator} label="Dont forget your last name" />
````

And in order to submit the form simply use the submit function from our ezform object:

````
<button onClick={ezform.submit}>Submit</button>
````

> Important: You can use dots to nest your submitted values, but for simplicity you only get the nested object when the form has been submitted (e.g. the values in the onSubmit config function).
> Example: `<FieldText id="firstName" name="this.path.is.nested.firstName" ... />` will pass an object to the onSubmit config function with the value of firstName stored in `values["this"]["path"]["is"]["nested"]["firstName"]`. However, when accessing fields or errors from the `FormRefObject` directly, they will only be accessible by calling `ezform.fields["this.path.is.nested.firstName"]`


## Validators

EZForm works with pure functions as validators and each `Field` component can take an optional `validator` prop. The function takes one argument which is the `value` that the field holds.  The only requirement for this function is, that it returns a `string` with an error message in case the input failed the validation, or `null` when the validation was successful.

This means you can pass any function that follows these requirements:

````
const customValidator = (value: any) => {
    if (value === "SomeCondition") {
        return "This is your error text!";
    }
    return null;
}
````

If you configured `useForm` for use with translations, your validator can also accept a second parameter:

````
const customValidatorWithTranslation = (value: any, formatMessage?: (messageKey: string) => string) => {
    if (value === "SomeCondition") {
        return formatMessage ? formatMessage("translation_key") : "Fallback error text!";
    }
    return null;
}
````

However, EZForm already comes with some basic validator functions that are ready to use:

### requiredValidator

Checks if a field has a null value or an empty string value

### requiredListValidator

Checks if an array (such as the value of a checkbox group or multiselect) is empty

### numberValidator

Checks if a fields value is a number

### emailValidator

Checks if an email is formed correctly

### urlValidator

Checks if an URL is formed correctly

### dateValidator

Checks if a date was entered correctly

### fileValidator

Checks if a file was selected on a `FieldFile` component. Please note that this validator only checks if a file is selected, but not if the filetype or size is invalid. You need to implement your own validator to handle these cases.

### combinedValidator

This function can be used to combine multiple validators. They will be checked in the order from first to last in the array.

Usage:
````
<FieldText label="First name" name="firstName" form={ezform} validator={combinedValidator([requiredValidator, urlValidator])} />
````

## Components

Currently, EZForm comes with a set of basic form fields based on Material UI form fields. It is, however, very easy to create your own components to use. Read more about it under "Creating your own Fields".

### FieldBase interface

This interface acts as a base for all field properties. All form components described below (except FieldCondition) can take the following properties:

- name: string;
- form: FormRefObject;
- id: string;
- validator?: (value: any) => string | null;
- disabled?: boolean;
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

## Creating your own Fields

You may want to integrate EZForm into your project without having to use Material UI's form components. 

All EZForm needs to work, is for your component to:

- accept a `name`, `form` and `validator` prop
- call the `useField` hook and pass the `name`, `validator` and `form` as function arguments
- implement a `handleChange` function which modifies the form field when the value changes. You are free on how you do it, but make sure to call `form.setField(name, value, validateImmediately);`. Notice that you need to pass the `name` prop to let EZForm know which field you are changing as well as the `value` of the form field. You can optionally instruct EZForm to validate the field after a change. If you dont pass the `validateImmediately` argument, it will default to `true`.

EZForm uses this technique internally to integrate Material UI's form fields. The great thing is, you may also call the `setField` method from anywhere you have a reference to the `ezform` object, which means you can alter the form after asynchronous data has been loaded.

Take a look at the `FieldText` source for an easy example:

````
const FieldText = (props: FieldTextProps) => {
	const { id, name, form, validator = () => null, disabled, label, multiline = false } = props;

	useField(name, validator, form);

	const handleChange = (e) => {
		form.setField(name, e.target.value);
	};

	return (
		<TextField
			variant="outlined"
			name={name}
			id={id}
			label={label}
			onChange={handleChange}
			value={form.fields?.[name] || ''}
			disabled={disabled}
			error={form.hasError(name)}
			helperText={form.getHelperText(name)}
			multiline={multiline}
		/>
	);
};
````
